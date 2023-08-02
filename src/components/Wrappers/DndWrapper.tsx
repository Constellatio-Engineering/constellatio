import { Button } from "@/components/atoms/Button/Button";
import { Input } from "@/components/atoms/Input/Input";
import { useCaisyField } from "@caisy/ui-extension-react";
import { Box, Title, Switch } from "@mantine/core";
import { useForm } from "@mantine/form";
import React, { useState } from "react";
import { randomId } from "@mantine/hooks";
import {
  CardItem,
  CardItemWrapper,
  Container,
  GameWrapper,
  OptionWrapper,
  OutputWrapper,
  switchStyle,
} from "./DndWrapper.styles";
import { BodyText } from "@/components/atoms/BodyText/BodyText";
import { Cross } from "@/components/Icons/Cross";
import { Check } from "../Icons/Check";
import { DndContext, KeyboardSensor, PointerSensor, closestCenter, useSensor, useSensors } from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableItem } from "../Helpers/SortableItem";
import { Checkbox } from "../atoms/Checkbox/Checkbox";
import { Handle } from "../Icons/Handle";

export type TValue = {
  options: { id: string; label: string; correctAnswer: boolean }[];
  orderRequired: boolean;
};

interface ICaisy {
  value: TValue;
  setValue: (value: TValue) => void;
  loaded: boolean;
  context: {
    projectId?: string;
    documentId?: string;
    schemaId?: string;
    token?: string;
    schemaFieldId?: string;
  };
}

export const DndWrapper = () => {
  const [checked, setChecked] = useState(false);

  const { loaded, setValue, value }: ICaisy = useCaisyField();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const form = useForm({
    initialValues: {
      option: "",
      correct: checked,
    },
  });

  const onSubmitHandler = () => {
    setValue({
      ...value,
      options: [
        ...value.options,
        {
          id: randomId(),
          label: form.values.option,
          correctAnswer: form.values.correct,
        },
      ],
    });
    form.values.option = "";
  };

  function handleDragEnd(event) {
    const { active, over } = event;

    if (active.id !== over.id) {
      // @ts-ignore
      setValue(() => {
        const oldIndex = value.options.findIndex((option) => option.id === active.id);
        const newIndex = value.options.findIndex((option) => option.id === over.id);

        return {
          ...value,
          options: arrayMove(value.options, oldIndex, newIndex),
        };
      });
    }
  }

  return !loaded ? (
    <BodyText styleType="body-01-bold">Loading...</BodyText>
  ) : !value ? (
    <Button styleType="tertiary" onClick={() => setValue({ options: [], orderRequired: false })} w={"25%"}>
      Reload
    </Button>
  ) : (
    <Container>
      <Title order={3}>Add Options for Drag N Drop Game</Title>
      <Button
        styleType="primary"
        onClick={() => setValue({ options: [], orderRequired: false })}
        w={"20%"}
        bg={"support-error.3"}
      >
        Rest All
      </Button>
      <GameWrapper>
        <OptionWrapper>
          <Box component="form" onSubmit={form.onSubmit(() => onSubmitHandler())}>
            <Input inputType="text" label={"Add an option"} {...form.getInputProps("option")} />

            <Box
              sx={(theme) => ({
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              })}
            >
              <Switch
                label={
                  <BodyText styleType="body-01-medium" c={checked ? "support-success.3" : "support-error.3"}>
                    Add as {checked ? "a correct" : "an correct"} option
                  </BodyText>
                }
                thumbIcon={checked ? <Check size={18} /> : <Cross size={18} />}
                size="md"
                checked={checked}
                onChange={() => {
                  setChecked((prev) => !prev);
                  form.setFieldValue("correct", !checked);
                }}
                styles={switchStyle({ checked })}
              />

              <Button
                styleType="primary"
                type="submit"
                disabled={form.getInputProps("option")?.value?.length <= 1}
                fullWidth
                w={"50%"}
              >
                Add
              </Button>
            </Box>
          </Box>
          <BodyText styleType="body-01-bold">You can drag and drop items to sort them</BodyText>

          <OutputWrapper>
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
              {value && value.options && value.options.length > 0 && (
                <SortableContext items={value.options.map((item) => item.id)} strategy={verticalListSortingStrategy}>
                  {value.options.map((option) => (
                    <CardItemWrapper key={option.id}>
                      <SortableItem id={option.id}>
                        <CardItem>
                          <BodyText
                            styleType="body-01-bold"
                            c={option?.correctAnswer ? "support-success.3" : "support-error.3"}
                          >
                            {option.label}
                          </BodyText>
                          <Handle />
                        </CardItem>
                      </SortableItem>
                      <span
                        onClick={() => {
                          setValue({
                            ...value,
                            options: value.options.filter((item) => item.id !== option.id),
                          });
                          console.log("clicked");
                        }}
                      >
                        <Cross />
                      </span>
                    </CardItemWrapper>
                  ))}
                </SortableContext>
              )}
            </DndContext>
          </OutputWrapper>
        </OptionWrapper>
      </GameWrapper>
      <Checkbox
        checked={value.orderRequired}
        label={<BodyText styleType="body-01-bold">Make answers order relevant</BodyText>}
        onChange={(e) => setValue({ ...value, orderRequired: e.target.checked })}
      />
    </Container>
  );
};
