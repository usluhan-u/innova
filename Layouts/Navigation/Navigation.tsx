import { FunctionComponent, useState, useRef, useCallback } from "react";
import MobileMenu from "../Header/MobileMenu/mobilemenu";
import PortalPopup from "../../components/Lofy/PortalPopup";
import styles from "./NavigationTest.module.css";
import Logo from "../../Graphics/Logo";

const Navigation: FunctionComponent = () => {
  const mobileMenuRef = useRef<HTMLAnchorElement>(null);
  const [isMobileMenu1Open, setMobileMenu1Open] = useState(false);

  const openMobileMenu1 = useCallback(() => {
    setMobileMenu1Open(true);
  }, []);

  const closeMobileMenu1 = useCallback(() => {
    setMobileMenu1Open(false);
  }, []);

  return (
    <>
      <div className={styles.navigationTest}>
        <header className={styles.header}>
          <div className={styles.navLeftitems}>
            <Logo />
            <div className={styles.navNavmenu}>
              <div className={styles.navhoverstate3}>
                <div className={styles.navNavitemDropdownbutton}>
                  <div className={styles.dropdownbuttonlabel}>Ürünler</div>
                  <img
                    className={styles.chevronDown16Icon}
                    alt=""
                    src="/chevrondown-16.svg"
                  />
                </div>
              </div>
              <div className={styles.navhoverstate3}>
                <div className={styles.navNavitemDropdownbutton}>
                  <div className={styles.dropdownbuttonlabel}>Çözümler</div>
                  <img
                    className={styles.chevronDown16Icon}
                    alt=""
                    src="/chevrondown-16.svg"
                  />
                </div>
              </div>
              <div className={styles.navhoverstate3}>
                <div className={styles.navNavitemDropdownbutton}>
                  <div className={styles.dropdownbuttonlabel}>Hizmetler</div>
                  <img
                    className={styles.chevronDown16Icon}
                    alt=""
                    src="/chevrondown-16.svg"
                  />
                </div>
              </div>
              <div className={styles.navhoverstate3}>
                <div className={styles.navNavitemDropdownbutton}>
                  <div className={styles.dropdownbuttonlabel}>Hakkında</div>
                  <img
                    className={styles.chevronDown16Icon}
                    alt=""
                    src="/chevrondown-16.svg"
                  />
                </div>
              </div>
              <a className={styles.navhoverstate34}>
                <div className={styles.navNavitemLink}>
                  <div className={styles.dropdownbuttonlabel}>Kariyer</div>
                </div>
              </a>
              <div className={styles.navhoverstate35}>
                <a className={styles.navNavitemLink1}>
                  <div className={styles.dropdownbuttonlabel}>Blog</div>
                </a>
              </div>
            </div>
          </div>
          <div className={styles.navSecondarymenu}>
            <a className={styles.search}>
              <img className={styles.vectorIcon8} alt="" src="/vector5.svg" />
            </a>
            <a className={styles.flagstr}>
              <img className={styles.vectorIcon9} alt="" src="/vector17.svg" />
              <img className={styles.groupIcon} alt="" src="/group.svg" />
            </a>
            <a
              className={styles.mobilemenu}
              ref={mobileMenuRef}
              onClick={openMobileMenu1}
            >
              <img className={styles.vectorIcon10} alt="" src="/vector18.svg" />
            </a>
          </div>
        </header>
      </div>
      {isMobileMenu1Open && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Bottom right"
          bottom={21}
          relativeLayerRef={mobileMenuRef}
          onOutsideClick={closeMobileMenu1}
        >
          <MobileMenu onClose={closeMobileMenu1} />
        </PortalPopup>
      )}
    </>
  );
};

export default Navigation;
