import { useEffect, useState } from 'react';
import i18n from 'i18next';
import { useTranslation } from "react-i18next";

const fileExtension = '.js';
const sourceFolder = '/src/';
/**
 * Custom hook to load i18n files from the same folder as the component.
 * @param {string} componentPath - Path to the component's folder.
 * @param {string} locale - Locale code to load (e.g., 'en-US', 'fr-FR').
 */
export const useComponentI18n = (componentPath, locale) => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const componentNameBasedNamespace = new URL(componentPath).pathname.split('/').pop().replace(fileExtension, '');
    const { t } = useTranslation(componentNameBasedNamespace)

    useEffect(() => {
        const loadTranslations = async () => {
            setIsLoading(true);
            try {
                const srcFolderIndex = componentPath.indexOf(sourceFolder);
                const cleanedPath = componentPath.substring(srcFolderIndex);
                const i18nFilePath = cleanedPath
                    .replace(sourceFolder, './')
                    .replace(componentNameBasedNamespace + fileExtension, 'locales/' + locale + '/strings.json')
                const i18nModule = await import(/* webpackInclude: /\.json$/ */ `${i18nFilePath}`);

                i18n.addResourceBundle(locale, componentNameBasedNamespace, i18nModule.default || i18nModule);
            } catch (err) {
                setError(`Error loading i18n file: ${err.message}`);
            } finally {
                setIsLoading(false);
            }
        };

        loadTranslations();
    }, [componentPath, locale]);

    return { t, isLoading, error };
};
