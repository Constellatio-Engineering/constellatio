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
  fileClientSideUuid: string;
  state: CanceledState | UploadingState | CompletedState | FailedState;
};

interface UploadsProgressStore
{
  setUploadState: (fileClientSideUuid: string, state: UploadState["state"]) => void;
  uploads: UploadState[];
}

const uploadsProgressStore = create(
  immer<UploadsProgressStore>((set, get) => ({
    setUploadState: (clientSideUuid, stateUpdate) =>
    {
      const fileIndex = get().uploads.findIndex(upload => upload.fileClientSideUuid === clientSideUuid);

      set(state =>
      {
        if(fileIndex === -1)
        {
          state.uploads = state.uploads.concat({
            fileClientSideUuid: clientSideUuid,
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
