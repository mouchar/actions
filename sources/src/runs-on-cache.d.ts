declare module 'runs-on-cache' {
    // import { DownloadOptions, UploadOptions } from './options';
    /**
     * Options to control cache upload
     */
    export interface UploadOptions {
        /**
         * Number of parallel cache upload
         *
         * @default 4
         */
        uploadConcurrency?: number
        /**
         * Maximum chunk size in bytes for cache upload
         *
         * @default 32MB
         */
        uploadChunkSize?: number
    }
    /**
     * Options to control cache download
     */
    export interface DownloadOptions {
        /**
         * Indicates whether to use the Azure Blob SDK to download caches
         * that are stored on Azure Blob Storage to improve reliability and
         * performance
         *
         * @default true
         */
        useAzureSdk?: boolean
        /**
         * Number of parallel downloads (this option only applies when using
         * the Azure SDK)
         *
         * @default 8
         */
        downloadConcurrency?: number
        /**
         * Indicates whether to use Actions HttpClient with concurrency
         * for Azure Blob Storage
         */
        concurrentBlobDownloads?: boolean
        /**
         * Maximum time for each download request, in milliseconds (this
         * option only applies when using the Azure SDK)
         *
         * @default 30000
         */
        timeoutInMs?: number
        /**
         * Time after which a segment download should be aborted if stuck
         *
         * @default 3600000
         */
        segmentTimeoutInMs?: number
        /**
         * Weather to skip downloading the cache entry.
         * If lookupOnly is set to true, the restore function will only check if
         * a matching cache entry exists and return the cache key if it does.
         *
         * @default false
         */
        lookupOnly?: boolean
    }
    /**
     * Returns a copy of the upload options with defaults filled in.
     *
     * @param copy the original upload options
     */
    export function getUploadOptions(copy?: UploadOptions): UploadOptions
    /*
     * Returns a copy of the download options with defaults filled in.
     *
     * @param copy the original download options
     */
    export function getDownloadOptions(copy?: DownloadOptions): DownloadOptions

    export class ValidationError extends Error {
        constructor(message: string)
    }
    export class ReserveCacheError extends Error {
        constructor(message: string)
    }
    /**
     * isFeatureAvailable to check the presence of Actions cache service
     *
     * @returns boolean return true if Actions cache service feature is available, otherwise false
     */
    export function isFeatureAvailable(): boolean
    /**
     * Restores cache from keys
     *
     * @param paths a list of file paths to restore from the cache
     * @param primaryKey an explicit key for restoring the cache
     * @param restoreKeys an optional ordered list of keys to use for restoring the cache if no cache hit occurred for key
     * @param downloadOptions cache download options
     * @param enableCrossOsArchive an optional boolean enabled to restore on windows any cache created on any platform
     * @returns string returns the key for the cache hit, otherwise returns undefined
     */
    export function restoreCache(
        paths: string[],
        primaryKey: string,
        restoreKeys?: string[],
        options?: DownloadOptions,
        enableCrossOsArchive?: boolean
    ): Promise<CacheEntry | undefined>
    /**
     * Saves a list of files with the specified key
     *
     * @param paths a list of file paths to be cached
     * @param key an explicit key for restoring the cache
     * @param enableCrossOsArchive an optional boolean enabled to save cache on windows which could be restored on any platform
     * @param options cache upload options
     * @returns number returns cacheId if the cache was saved successfully and throws an error if save fails
     */
    export function saveCache(
        paths: string[],
        key: string,
        options?: UploadOptions,
        enableCrossOsArchive?: boolean
    ): Promise<CacheEntry>

    // PATCHED: Add `CacheEntry` as return type for save/restore functions
    // This allows us to track and report on cache entry sizes.
    export class CacheEntry {
        key: string
        size?: number
        constructor(key: string, size?: number)
    }
}
