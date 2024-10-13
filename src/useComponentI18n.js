import i18n from 'i18next';
import { useTranslation } from "react-i18next";

const sourceFolder = '/src/';
const translationLoadCache = new Map();

const getI18nFilePath = (componentPath, locale) => {
    const filename = new URL(componentPath).pathname.split('/').pop();
    return componentPath
        .substring(componentPath.indexOf(sourceFolder))
        .replace(sourceFolder, './')
        .replace(filename, `locales/${locale}/strings.json`);
};

/**
 * Custom hook to load i18n files from the same folder as the component.
 * @param {string} componentPath - Path to the component's folder.
 */
export const useComponentI18n = (componentPath) => {
    const locale = i18n?.language;
    const { t } = useTranslation(componentPath);
    const cacheKey = `${locale}:${componentPath}`;
    const isTranslationLoaded = i18n.hasResourceBundle(locale, componentPath);
    const isTranslationCached = translationLoadCache.has(cacheKey);
    const i18nFilePath = getI18nFilePath(componentPath, locale);

    if (!isTranslationLoaded) {
        if (!isTranslationCached) {
            const translationLoadPromise = new Promise(async (resolve, reject) => {
                try {
                    const i18nModule = await import(/* webpackInclude: /\.json$/ */ `${i18nFilePath}`);
                    i18n.addResourceBundle(locale, componentPath, i18nModule.default || i18nModule, true, true);
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });

            translationLoadCache.set(cacheKey, translationLoadPromise);
        }

        throw translationLoadCache.get(cacheKey);
    }

    return { t };
};
