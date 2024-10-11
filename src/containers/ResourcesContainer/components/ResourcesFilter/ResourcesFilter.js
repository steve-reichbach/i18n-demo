import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {ReactComponent as SearchIcon} from '../../../../assets/icons/search.svg';
import {TextField} from '../../../../components/TextField/TextField';
import {inputBackgroundColor} from '../../../../styles/colors';
import {useComponentI18n} from "../../../../useComponentI18n";
import i18n from "i18next";

const FilterFieldContainer = styled.div`
  display: flex;
  background-color: ${inputBackgroundColor};
  margin-top: 8px;
  > div {
    flex: 4;
  }
  > svg {
    flex: 1;
  }
`;

const StyledTextField = styled(TextField)`
  font-size: 12px;
  color: #696969;
  background-color: inherit;
  ::placeholder {
    opacity: 0.5;
  }
`;

const StyledSearchIcon = styled(SearchIcon)`
  height: 20px;
  margin: auto 0;

  #search {
    fill: #656565;
  }
`;

export default function ResourcesFilter({onChange, value}) {
    const { t, isLoading, error } = useComponentI18n(import.meta.url, i18n.language);
    return (
        !isLoading && !error && (<FilterFieldContainer>
            <StyledTextField {...{
                onChange,
                value,
                readOnly: false,
                placeholder: t('PLACEHOLDER'),
                spellCheck: 'false'
            }} />
            <StyledSearchIcon/>
        </FilterFieldContainer>)
    );
}

ResourcesFilter.propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.string
};
