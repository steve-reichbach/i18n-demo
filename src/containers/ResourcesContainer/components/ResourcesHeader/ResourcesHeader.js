import React, { Suspense } from 'react';
import styled from 'styled-components';
import { HeaderText, SubHeaderText } from '../../../../styles/commonStyles';
import { useComponentI18n } from "../../../../useComponentI18n";

const ResourceHeaderText = styled(HeaderText)`
    color: #686868;
    margin-bottom: 3px;
`;

export default function ResourcesHeader() {
    const { t } = useComponentI18n(import.meta.url);

    return (
        <Suspense fallback={'Loading translations...'}>
            <ResourceHeaderText>{t('TITLE')}</ResourceHeaderText>
            <SubHeaderText>{t('SUBTITLE')}</SubHeaderText>
        </Suspense>
    );
}
