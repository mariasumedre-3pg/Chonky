import { Nilable, Nullable } from 'tsdef';

import { FileData, FileFilter } from '../types/files.types';
import { FileHelper } from '../util/file-helper';
import { RootState } from './reducers';

export const selectFileActionMap = (state: RootState) => state.fileActionMap;
export const selectFileActionData = (fileActionId: string) => (state: RootState) =>
    selectFileActionMap(state)[fileActionId];
export const selectToolbarItems = (state: RootState) => state.toolbarItems;

export const selectFolderChain = (state: RootState) => state.folderChain;
export const selectParentFolder = (state: RootState) => {
    const folderChain = selectFolderChain(state);
    const parentFolder =
        folderChain.length > 1 ? folderChain[folderChain.length - 2] : null;
    return parentFolder;
};

export const selectRawFiles = (state: RootState) => state.rawFiles;
export const selectFileMap = (state: RootState) => state.fileMap;
export const selectFileActionIds = (state: RootState) => state.fileActionIds;
export const selectFileData = (fileId: Nullable<string>) => (state: RootState) =>
    fileId ? selectFileMap(state)[fileId] : null;

export const selectDisplayFileIds = (state: RootState) => state.displayFileIds;

export const selectSelectionMap = (state: RootState) => state.selectionMap;
export const selectSelectedFileIds = (state: RootState) =>
    Object.keys(selectSelectionMap(state));
export const selectSelectionSize = (state: RootState) =>
    selectSelectedFileIds(state).length;
export const selectIsFileSelected = (fileId: Nullable<string>) => (state: RootState) =>
    !!fileId && !!selectSelectionMap(state)[fileId];
export const selectSelectedFilesForAction = (fileActionId: string) => (
    state: RootState
) => {
    const { fileActionMap } = state;
    const action = fileActionMap[fileActionId];
    if (!action || !action.requiresSelection) return undefined;

    return getSelectedFiles(state, action.fileFilter);
};
export const selectSelectedFilesForActionCount = (fileActionId: string) => (
    state: RootState
) => getSelectedFilesForAction(state, fileActionId)?.length;

export const selectFileViewConfig = (state: RootState) => state.fileViewConfig;

export const selectSortActionId = (state: RootState) => state.sortActionId;
export const selectSortOrder = (state: RootState) => state.sortOrder;

export const selectOptionMap = (state: RootState) => state.optionMap;
export const selectOptionValue = (optionId: string) => (state: RootState) =>
    selectOptionMap(state)[optionId];

export const selectThumbnailGenerator = (state: RootState) => state.thumbnailGenerator;
export const selectDoubleClickDelay = (state: RootState) => state.doubleClickDelay;
export const selectIsDnDDisabled = (state: RootState) => state.disableDragAndDrop;
export const selectClearSelectionOnOutsideClick = (state: RootState) =>
    state.clearSelectionOnOutsideClick;

// Selectors meant to be used outside of Redux code
export const getIsFileSelected = (state: RootState, file: FileData) => {
    return FileHelper.isSelectable(file) && !!selectSelectionMap(state)[file.id];
};
export const getSelectedFiles = (
    state: RootState,
    ...filters: Nilable<FileFilter>[]
) => {
    const { fileMap, selectionMap } = state;

    const selectedFiles = Object.keys(selectionMap).map((id) => fileMap[id]);
    const filteredSelectedFiles = filters.reduce(
        (prevFiles, filter) => (filter ? prevFiles.filter(filter) : prevFiles),
        selectedFiles
    );
    return filteredSelectedFiles;
};
export const getSelectedFilesForAction = (state: RootState, fileActionId: string) =>
    selectSelectedFilesForAction(fileActionId)(state);