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

type UploadState = {
  fileName: string;
  state: CanceledState | UploadingState | CompletedState | FailedState;
};

interface UploadsProgressStore
{
  setUploadState: (fileName: string, state: UploadState["state"]) => void;
  uploads: UploadState[];
}

const uploadsProgressStore = create(
  immer<UploadsProgressStore>((set, get) => ({
    setUploadState: (fileName, stateUpdate) =>
    {
      const fileIndex = get().uploads.findIndex(upload => upload.fileName === fileName);

      set(state =>
      {
        if(fileIndex === -1)
        {
          state.uploads = state.uploads.concat({
            fileName,
            state: stateUpdate
          });
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
