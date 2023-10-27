import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type CanceledState = {
  type: "cancelled";
};

type FailedState = {
  type: "failed";
};

type UploadingState = {
  progressInPercent: number;
  type: "uploading";
};

type CompletedState = {
  type: "completed";
};

export type UploadState = {
  clientSideUuid: string;
  fileNameWithExtension: string;
  state: CanceledState | UploadingState | CompletedState | FailedState;
};

interface UploadsProgressStore
{
  setUploadState: (newState: UploadState) => void;
  uploads: UploadState[];
}

const uploadsProgressStore = create(
  immer<UploadsProgressStore>((set, get) => ({
    setUploadState: (newState) =>
    {
      const { clientSideUuid, state: stateUpdate } = newState;
      const fileIndex = get().uploads.findIndex(upload => upload.clientSideUuid === clientSideUuid);

      set(state =>
      {
        if(fileIndex === -1)
        {
          state.uploads = state.uploads.concat(newState);
        }
        else
        {
          state.uploads[fileIndex]!.state = stateUpdate;
        }
      });
    },
    uploads: []
  }))
);

export default uploadsProgressStore;
