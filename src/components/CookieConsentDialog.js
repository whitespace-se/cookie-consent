import React from "react";
import cx from "classnames";

{
  /* <p id={`${ns}-description`} className={`${ns}__description`}>
{description}{" "}
{morelink && morelink.url ? (
  <Link className={cx(`${ns}__more`)} to={morelink.url}>
    {morelink.text}
  </Link>
) : null}
</p> */
}

export default function CookieConsentDialog({
  namespace: ns = "cookie-consent",
  title,
  children,
  allowButtonLabel,
  denyButtonLabel,
  onAllow,
  onDeny,
  position,
  contentRef,
  className,
  ...restProps
}) {
  return (
    <div
      className={cx(`${ns}`, position && `${ns}--${position}`, className)}
      role="region"
      aria-live="polite"
      aria-labelledby={`${ns}-title`}
      aria-describedby={`${ns}-description`}
      {...restProps}
    >
      <div
        role="document"
        className={`${ns}__container`}
        tabIndex="0"
        ref={contentRef}
      >
        <h2 id={`${ns}-title`} className={`${ns}__title`}>
          {title}
        </h2>
        <div id={`${ns}-description`} className={`${ns}__description`}>
          {children}
        </div>

        <div className={`${ns}__button-group`}>
          {denyButtonLabel && (
            <button
              className={`${ns}__button ${ns}__button--deny`}
              type="button"
              onClick={onDeny}
            >
              {denyButtonLabel}
            </button>
          )}
          {allowButtonLabel && (
            <button
              className={`${ns}__button ${ns}__button--allow`}
              type="button"
              onClick={onAllow}
            >
              {allowButtonLabel}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
