import React, { useCallback, useState } from "react";
import { t } from "ttag";
import { Location, LocationDescriptorObject } from "history";

import Link from "metabase/core/components/Link";
import Tooltip from "metabase/components/Tooltip";
import LogoIcon from "metabase/components/LogoIcon";

import SearchBar from "metabase/nav/components/SearchBar";
import SidebarButton from "metabase/nav/components/SidebarButton";
import NewButton from "metabase/nav/containers/NewButton";

import Database from "metabase/entities/databases";
import { isSmallScreen } from "metabase/lib/dom";

import {
  AppBarRoot,
  LogoIconWrapper,
  SearchBarContainer,
  SearchBarContent,
  RowLeft,
  RowRight,
} from "./AppBar.styled";

type Props = {
  isSidebarOpen: boolean;
  location: Location;
  onNewClick: () => void;
  onToggleSidebarClick: () => void;
  handleCloseSidebar: () => void;
  onChangeLocation: (nextLocation: LocationDescriptorObject) => void;
};

function AppBar({
  isSidebarOpen,
  location,
  onNewClick,
  onToggleSidebarClick,
  handleCloseSidebar,
  onChangeLocation,
}: Props) {
  const [isSearchActive, setSearchActive] = useState(false);

  const onLogoClick = useCallback(() => {
    if (isSmallScreen()) {
      handleCloseSidebar();
    }
  }, [handleCloseSidebar]);

  const onSearchActive = useCallback(() => {
    if (isSmallScreen()) {
      setSearchActive(true);
      handleCloseSidebar();
    }
  }, [handleCloseSidebar]);

  const onSearchInactive = useCallback(() => {
    if (isSmallScreen()) {
      setSearchActive(false);
    }
  }, []);

  return (
    <AppBarRoot>
      <RowLeft>
        <LogoIconWrapper>
          <Link to="/" onClick={onLogoClick} data-metabase-event="Navbar;Logo">
            <LogoIcon size={24} />
          </Link>
        </LogoIconWrapper>
        {!isSearchActive && (
          <Tooltip tooltip={isSidebarOpen ? t`Close sidebar` : t`Open sidebar`}>
            <SidebarButton
              isSidebarOpen={isSidebarOpen}
              onClick={onToggleSidebarClick}
            />
          </Tooltip>
        )}
      </RowLeft>
      <RowRight>
        <SearchBarContainer>
          <SearchBarContent>
            <SearchBar
              location={location}
              onChangeLocation={onChangeLocation}
              onSearchActive={onSearchActive}
              onSearchInactive={onSearchInactive}
            />
          </SearchBarContent>
        </SearchBarContainer>
        <NewButton setModal={onNewClick} />
      </RowRight>
    </AppBarRoot>
  );
}

export default Database.loadList({ loadingAndErrorWrapper: false })(AppBar);
