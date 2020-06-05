import React from "react";
import cx from "classnames";

import CookieConsentDialog from "./CookieConsentDialog";

export default function CookieConsentContainer({
  namespace: ns = "cookie-consent",
  i18n,
  answer,
  setAnswer,
  constants: { ALLOW, DENY },
  text,
  ...restProps
}) {
  if (answer) {
    return null;
  }
  return (
    <CookieConsentDialog
      namespace={ns}
      onAllow={() => setAnswer(ALLOW)}
      onDeny={() => setAnswer(DENY)}
      title={i18n("title")}
      allowButtonLabel={i18n("allow")}
      denyButtonLabel={i18n("deny")}
      {...restProps}
    >
      {text || (
        <p>
          {i18n("text")}{" "}
          <a href={i18n("readMoreURL")} className={cx(`${ns}__more`)}>
            {i18n("readMore")}
          </a>
        </p>
      )}
    </CookieConsentDialog>
  );
}
