import React from "react";
import ReactDOM from "react-dom";
import en from "./messages/en.json";
import sv from "./messages/sv.json";
import CookieConsentContainer from "./components/CookieConsentContainer";
import differenceInMonths from "date-fns/differenceInMonths";
import * as yett from "./yett/src";

let whitelist;
let resetElementSelector;
let dialogContainerSelector;
let defaultMessages = { en, sv };
let messages;
let blocked = false;
let onAnswer;
let onAllow;
let onDeny;
let onUnblockScripts;
let componentProps;
let dialogContentRef = React.createRef();

const LOCALSTORAGE_ITEM = "whitespace/cookie-consent";
const ALLOW = "allow";
const DENY = "deny";
const DEFAULT_RESET_SELECTOR = ".js-cookie-consent-reset";
const DEFAULT_LANG = "en";

function init(options, callback) {
  whitelist = options.whitelist || [];
  resetElementSelector = options.resetElement || DEFAULT_RESET_SELECTOR;
  let currentLanguage = options.currentLanguage || DEFAULT_LANG;
  messages = {
    ...(defaultMessages[currentLanguage] || defaultMessages[DEFAULT_LANG]),
    ...((options.messages && options.messages[currentLanguage]) || {}),
  };
  onAnswer = options.onAnswer || (() => {});
  onAllow = options.onAllow || (() => {});
  onDeny = options.onDeny || (() => {});
  onUnblockScripts = options.onUnblockScripts || (() => {});
  componentProps = {
    namespace: options.namespace || "cookie-consent",
    position: options.position || "bottom-left",
    ...options.componentProps,
  };
  let answer = getAnswer();
  if (answer !== ALLOW) {
    blockScripts();
  }
  document.addEventListener("DOMContentLoaded", function () {
    if (!dialogContainerSelector) {
      dialogContainerSelector = document.createElement("div");
      document.body.appendChild(dialogContainerSelector);
    }
    bindResetElement();
    renderDialog(callback);
  });
  window.addEventListener("storage", (event) => {
    if (event.key == null || event.key === LOCALSTORAGE_ITEM) {
      onStoreUpdate();
    }
  });
}

const defaultStore = {
  answer: null,
  answeredOn: null,
};

function getStore() {
  let savedStore = localStorage.getItem(LOCALSTORAGE_ITEM);
  if (savedStore) {
    try {
      return JSON.parse(savedStore) || defaultStore;
    } catch {
      return defaultStore;
    }
  }
  return defaultStore;
}

function setStore(value, callback) {
  localStorage.setItem(LOCALSTORAGE_ITEM, JSON.stringify(value));
  onStoreUpdate(callback);
}

function getAnswer() {
  const { answer, answeredOn } = getStore();
  if (
    answer != null &&
    differenceInMonths(new Date(), new Date(answeredOn)) < 12
  ) {
    return answer;
  }
  return null;
}

function setAnswer(answer, callback) {
  setStore(
    {
      answer,
      answeredOn: new Date().toISOString(),
    },
    callback,
  );
  onAnswer(answer);
  if (answer === ALLOW) {
    onAllow();
  } else if (answer != null) {
    onDeny();
  }
}

function onStoreUpdate(callback) {
  let answer = getAnswer();
  if (answer === ALLOW) {
    unblockScripts();
    onUnblockScripts();
  }
  renderDialog(callback);
}

function blockScripts() {
  if (blocked) {
    return;
  }

  // add current origin to whitelist
  if (window.location.origin) {
    whitelist.push(`${window.location.origin}/*`);
  }

  //convert strings to regex and escape special characters
  whitelist = whitelist.map(function (domain) {
    return new RegExp(
      `^${domain.replace(/[.+?^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*")}$`,
    );
  });

  yett.init({ whitelist });

  blocked = true;
}

function unblockScripts() {
  if (!blocked) {
    return;
  }
  yett.unblock();
  blocked = false;
}

function i18n(key) {
  return messages[key];
}

function getElement(selectorOrElement) {
  if (typeof selectorOrElement === "string") {
    return document.querySelector(selectorOrElement);
  }
  return selectorOrElement;
}

function getDialogContainer() {
  return getElement(dialogContainerSelector);
}

function getResetElement() {
  return getElement(resetElementSelector);
}

function renderDialog(callback) {
  ReactDOM.render(
    <CookieConsentContainer
      i18n={i18n}
      answer={getAnswer()}
      setAnswer={setAnswer}
      constants={{ ALLOW, DENY }}
      contentRef={dialogContentRef}
      {...componentProps}
    />,
    getDialogContainer(),
    callback,
  );
}

function bindResetElement() {
  let element = getResetElement();
  if (element) {
    element.addEventListener("click", () => {
      reset();
    });
  }
}

function reset() {
  setStore(null, () => {
    if (dialogContentRef.current) {
      dialogContentRef.current.focus();
    }
  });
}

export { init, reset, getAnswer, setAnswer, ALLOW, DENY, LOCALSTORAGE_ITEM };
