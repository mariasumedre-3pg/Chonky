import { Nullable } from 'tsdef';

import { FileData } from './file.types';

export interface MouseClickFilePayload {
    file: FileData;
    fileDisplayIndex: number;
    altKey: boolean;
    ctrlKey: boolean;
    shiftKey: boolean;
    clickType: 'single' | 'double';
}

export interface KeyboardClickFilePayload {
    file: FileData;
    fileDisplayIndex: number;
    enterKey: boolean;
    spaceKey: boolean;
    altKey: boolean;
    ctrlKey: boolean;
    shiftKey: boolean;
}

export interface StartDragNDropPayload {
    dragSource: FileData;
}

export interface EndDragNDropPayload {
    sourceInstanceId: string;
    source: Nullable<FileData>;
    draggedFile: FileData;
    destination: FileData;
    copy: boolean;
}

export type MoveFilesPayload = EndDragNDropPayload & { files: FileData[] };

export type ChangeSelectionPayload = { selection: Set<string> };

export interface OpenFilesPayload {
    targetFile?: FileData;
    files: FileData[];
}

export interface OpenFileContextMenuPayload {
    clientX: number;
    clientY: number;
    triggerFileId: Nullable<string>;
}