import React, {useState} from 'react';
import styled from 'styled-components';
import logo from '../../assets/images/plainid-logo-white.png';
import {headerPanelHeight} from '../../styles/commonStyles';
import { MenuItem, Select } from '@mui/material';
import i18n from "i18next";

const HeaderPanelContainer = styled.header`
  display: flex;
  background-color: #4b555f;
  top: 0;
  left: 0;
  right: 0;
  position: fixed;
  height: ${headerPanelHeight};
  align-items: center;
  z-index: 1;
`;

const Logo = styled.img`
  width: auto;
  height: 100%;
  padding: 7px;
`;
const LanguageSelect = styled.div`
    position: absolute;
    right: 10px;
`

export default function HeaderPanel() {
    const [language, setLanguage] = useState(i18n.language);
    return (
        <HeaderPanelContainer>
            <Logo {...{
                src: logo,
                alt: 'Logo'
            }} />
            <LanguageSelect>
                <Select
                    sx={{backgroundColor: '#f3f3f3'}}
                    size={'small'}
                    value={language}
                    label="Switch language"
                    onChange={(e) => {
                        i18n.changeLanguage(e.target.value)
                        setLanguage(e.target.value)
                    }}
                >
                    <MenuItem value={'en-US'}>🇺🇸English</MenuItem>
                    <MenuItem value={'es-ES'}>🇪🇸Español</MenuItem>
                </Select>
            </LanguageSelect>
        </HeaderPanelContainer>
    );
}
