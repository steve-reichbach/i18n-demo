import React from 'react';
import styled from 'styled-components';
import { HeaderText, SubHeaderText } from '../../../../styles/commonStyles';
import i18n from 'i18next';
import { useComponentI18n } from "../../../../useComponentI18n";

const ResourceHeaderText = styled(HeaderText)`
    color: #686868;
    margin-bottom: 3px;
`;

export default function ResourcesHeader() {
    const { t, isLoading, error } = useComponentI18n(import.meta.url, i18n.language);

    return (
        !isLoading && !error && (<>
            <ResourceHeaderText>{t('TITLE')}</ResourceHeaderText>
            <SubHeaderText>{t('SUBTITLE')}</SubHeaderText>
        </>)
    );
}
