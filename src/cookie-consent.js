import sv from "./lang/sv.json";
import en from "./lang/en.json";

var whitelist;
var categories;
var current_language;
var base_path;
const strings = {
  sv,
  en
};
var yett;

function initiate() {
  window.YETT_WHITELIST = whitelist;
  yett = require("yett");

  categories = [
    {
      key: "necessary",
      mutable: false,
      default: "on"
    },
    {
      key: "other",
      mutable: true,
      default: "off"
    }
  ];
  document.addEventListener("DOMContentLoaded", function() {
    setup();
  });
}

// has user accepted all cookies? (rather, more than necessary)
function acceptedAll() {
  return localStorage.getItem("category") == "all";
}

function isset() {
  return localStorage.getItem("category") != null;
}

// setup component and draw it to screen
function setup() {
  var translation_file = base_path + "lang/" + current_language + ".json";
  var data = strings[current_language];

  i18n.translator.add(data);

  var el = document.createElement("div");
  el.setAttribute("id", "cookieconsent");
  el.innerHTML = `
				<div
					role="dialog"
					aria-live="polite"
					aria-labelledby="ccTitle"
					aria-describedby="ccDesc"
					class="cc cc--bl cc--bs"
				>
					<div role="document" tabindex="0">
						<h2 id="ccTitle">${i18n("ccTitle")}</h2>
						<p id="ccDesc">${i18n("ccText")} <a href='${i18n(
    "ccReadMoreURL"
  )}' class='cc__more'>${i18n("ccReadMoreLabel")}</a></p>
						<div class="cc__settingsWrapper">
							<button
								class="cc__settingsButton"
								id="cc__settingsButton"
								aria-expanded="false"
							>
								<svg 
									class="cc__icon-open"
									aria-hidden="true"
									xmlns="http://www.w3.org/2000/svg" 
									width="24" 
									height="24" 
									viewBox="0 0 24 24" 
									fill="none" 
									stroke="currentColor" 
									stroke-width="2" 
									stroke-linecap="round" 
									stroke-linejoin="round" 
									class="feather feather-plus-circle">
										<circle cx="12" cy="12" r="10"></circle>
										<line x1="12" y1="8" x2="12" y2="16"></line>
										<line x1="8" y1="12" x2="16" y2="12"></line>
								</svg>
								<svg
									hidden
									class="cc__icon-close"
									aria-hidden="true"
									xmlns="http://www.w3.org/2000/svg" 
									width="24" 
									height="24" 
									viewBox="0 0 24 24" 
									fill="none" 
									stroke="currentColor" 
									stroke-width="2" 
									stroke-linecap="round" 
									stroke-linejoin="round" 
									class="feather feather-minus-circle">
										<circle cx="12" cy="12" r="10"></circle>
										<line x1="8" y1="12" x2="16" y2="12"></line>
								</svg>
								${i18n("ccSettingsLabel")}
							</button>
							<div id="cc__settings">
								${categories
                  .map(
                    category => `
									<label class="cc__checkbox-label ${
                    category.mutable ? "" : "cc__checkbox-label--disabled"
                  }">
										<input type="checkbox" value="${category.key}" autocomplete="off"
												${category.default === "on" ? "checked" : ""}
												${!category.mutable ? "disabled" : ""}
										/>
										<span class="cc__checkbox-checkmark"></span>
										${i18n(category.key)}
									</label>
								`
                  )
                  .join("")}
							</div>
						</div>
						<button class="cc__acceptButton" id="cc__acceptButton">
							<svg
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								stroke="currentColor"
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="4"
								class="feather feather-check"
								viewBox="0 0 24 24"
							>
								<defs />
								<path d="M20 6L9 17l-5-5" />
							</svg>
							<span>${i18n("ccAcceptCookies")}</span>
						</button>
					</div>
				</div>
			`;
  document.body.appendChild(el);

  // if all categories has been accepted, unblock yett
  if (acceptedAll()) {
    yett.unblock();
  }

  // if category has been set,
  // dont do anything, just hide.
  if (isset()) {
    el.classList.add("cc--hidden");
    // return false;
  }

  var ccActive = false;
  // Show/hide settings panel
  var ccAccept = document.querySelector("#cc__acceptButton");
  var ccAcceptSpan = ccAccept.querySelector("span");
  var ccSettingsWrapper = document.querySelector(".cc__settingsWrapper");
  var ccSettingsButton = document.querySelector("#cc__settingsButton");
  var ccOpenIcon = document.querySelector(".cc__icon-open");
  var ccCloseIcon = document.querySelector(".cc__icon-close");
  var ccSettingsAlt = document.querySelector("#cc__settings");
  ccSettingsButton.addEventListener("click", function() {
    if (ccSettingsAlt.classList.contains("cc-active")) {
      this.setAttribute("aria-expanded", "false");
      ccSettingsAlt.classList.remove("cc-active");
      ccSettingsWrapper.classList.remove("cc__settingsWrapper--active");
      ccAcceptSpan.innerHTML = i18n("ccAcceptCookies");
      ccOpenIcon.removeAttribute("hidden");
      ccCloseIcon.setAttribute("hidden", "hidden");
    } else {
      ccSettingsAlt.classList.add("cc-active");
      ccSettingsWrapper.classList.add("cc__settingsWrapper--active");
      this.setAttribute("aria-expanded", "true");
      ccAcceptSpan.innerHTML = i18n("ccAcceptCookieSettings");
      ccOpenIcon.setAttribute("hidden", "hidden");
      ccCloseIcon.removeAttribute("hidden");
    }
    ccActive = true;
  });

  // Accept cookies
  ccAccept.addEventListener("click", function(e) {
    var category = "necessary";
    var cbs = document.querySelectorAll("#cc__settings input");
    for (var i = 0; i < cbs.length; i++) {
      //TODO: handle multiple categories
      //alpha version explanation:
      //in this version we either accept cookies or not
      //if other isnt checked, only the whitelist gets loaded
      //so we need only act on this
      //in future versions this will not do
      //we will have to rework this into something
      //a weeeee bit more versatile :-P
      if ((cbs[i].value == "other" && cbs[i].checked) || !ccActive) {
        yett.unblock();
        category = "all";
      }
    }
    localStorage.setItem("category", category);
    el.classList.add("cc--hidden");
    e.preventDefault();
  });

  el.addEventListener("click", function(e) {
    var target = e.target || e.currentTarget;
    if (parentHasClassName(target, "cc__settingsWrapper") !== true) {
      if (ccSettingsAlt.classList.contains("cc-active")) {
        ccSettingsButton.click();
      }
    }
  });
}

function fetchJSONFile(path, callback) {
  var httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = function() {
    if (httpRequest.readyState === 4) {
      if (httpRequest.status === 200) {
        var data = JSON.parse(httpRequest.responseText);
        if (callback) callback(data);
      }
    }
  };
  httpRequest.open("GET", path);
  httpRequest.send();
}

function parentHasClassName(element, classname) {
  return element && (element.classList && element.classList.contains(classname) || element.parentNode && parentHasClassName(element.parentNode, classname));
}

export default {
  // public init function, call this with below parameters
  init: function(params) {
    current_language = params.current_language;
    whitelist = params.whitelist;
    categories = params.categories;
    base_path = params.base_path;
    initiate();
  },

  // clears all settings and pops up the cookie selector
  clearSettings: function() {
    localStorage.removeItem("category");
    localStorage.removeItem("fingerprinted");
    var cc = document.querySelector("#cookieconsent");
    if (cc != null) {
      cc.classList.remove("cc--hidden");
    } else {
      initiate();
    }
  },

  acceptedAll: function() {
    return acceptedAll();
  },

  isset: function() {
    return isset();
  }
};
