import { BodyText } from "@/components/atoms/BodyText/BodyText";
import { Button } from "@/components/atoms/Button/Button";
import { Input } from "@/components/atoms/Input/Input";
import { SortableItem } from "@/components/helpers/SortableItem";
import { Cross } from "@/components/Icons/Cross";

import { useCaisyField } from "@caisy/ui-extension-react";
import {
  DndContext, type DragEndEvent, KeyboardSensor, PointerSensor, closestCenter, useSensor, useSensors 
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Box, Title, Switch } from "@mantine/core";
import { useForm } from "@mantine/form";
import { randomId } from "@mantine/hooks";
import React, { type FC, useState } from "react";

import {
  CardItem,
  CardItemWrapper,
  Container,
  GameWrapper,
  OptionWrapper,
  OutputWrapper,
  switchStyle,
} from "./DndGame.styles";
import { Checkbox } from "../../atoms/Checkbox/Checkbox";
import { Check } from "../../Icons/Check";
import { Handle } from "../../Icons/Handle";

export interface TValue 
{
  options: { correctAnswer: boolean; id: string; label: string }[];
  orderRequired: boolean;
}

interface ICaisy 
{
  context: {
    documentId?: string;
    projectId?: string;
    schemaFieldId?: string;
    schemaId?: string;
    token?: string;
  };
  loaded: boolean;
  setValue: (value: TValue) => void;
  value: TValue;
}

export const DndWrapper: FC = () => 
{
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
      correct: checked,
      option: "",
    },
  });

  const onSubmitHandler = (): void => 
  {
    setValue({
      ...value,
      options: [
        ...value.options,
        {
          correctAnswer: form.values.correct,
          id: randomId(),
          label: form.values.option,
        },
      ],
    });
    form.values.option = "";
  };

  function handleDragEnd(event: DragEndEvent): void 
  {
    const { active, over } = event;

    if(active.id !== over?.id) 
    {
      const oldIndex = value.options.findIndex((option) => option.id === active.id);
      const newIndex = value.options.findIndex((option) => option.id === over?.id);
      const newOptions = arrayMove(value.options, oldIndex, newIndex);
      setValue({
        ...value,
        options: newOptions,
      });
    }
  }

  return !loaded ? (
    <BodyText component="p" styleType="body-01-bold">
      Loading...
    </BodyText>
  ) : !value ? (
    <Button 
    // Disabled this rule because ESLint doesn't recognize the type of the Button component
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      styleType="tertiary"
      onClick={() => setValue({ options: [], orderRequired: false })}
      w="25%">
      Reload
    </Button>
  ) : (
    <Container>
      <Title order={3}>Add Options for Drag N Drop Game</Title>
      <Button
        styleType="primary"
        onClick={() => setValue({ options: [], orderRequired: false })}
        w="20%"
        bg="support-error.3">
        Rest All
      </Button>
      <GameWrapper>
        <OptionWrapper>
          <Box component="form" onSubmit={form.onSubmit(() => onSubmitHandler())}>
            <Input inputType="text" label="Add an option" {...form.getInputProps("option")}/>
            <Box
              sx={() => ({
                alignItems: "center",
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              })}>
              <Switch
                label={(
                  <BodyText
                    component="p"
                    styleType="body-01-medium"
                    c={checked ? "support-success.3" : "support-error.3"}>
                    Add as {checked ? "a correct" : "an correct"} option
                  </BodyText>
                )}
                thumbIcon={checked ? <Check size={18}/> : <Cross size={18}/>}
                size="md"
                checked={checked}
                onChange={() => 
                {
                  setChecked((prev) => !prev);
                  form.setFieldValue("correct", !checked);
                }}
                styles={switchStyle({ checked })}
              />
              <Button
              // Disabled this rule because ESLint doesn't recognize the type of the Button component
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                styleType="primary"
                type="submit"
                disabled={form.getInputProps("option")?.value?.length <= 1}
                fullWidth
                w="50%">
                Add
              </Button>
            </Box>
          </Box>
          <BodyText component="p" styleType="body-01-bold">
            You can drag and drop items to sort them
          </BodyText>
          <OutputWrapper>
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
              {value && value.options && value.options.length > 0 && (
                <SortableContext items={value.options.map((item) => item.id)} strategy={verticalListSortingStrategy}>
                  {value.options.map((option) => (
                    <CardItemWrapper key={option.id}>
                      <SortableItem id={option.id}>
                        <CardItem>
                          <BodyText
                            component="p"
                            styleType="body-01-bold"
                            c={option?.correctAnswer ? "support-success.3" : "support-error.3"}>
                            {option.label}
                          </BodyText>
                          <Handle/>
                        </CardItem>
                      </SortableItem>
                      <span
                        onClick={() => 
                        {
                          setValue({
                            ...value,
                            options: value.options.filter((item) => item.id !== option.id),
                          });
                        }}>
                        <Cross/>
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
        label={(
          <BodyText component="p" styleType="body-01-bold">
            Make answers order relevant
          </BodyText>
        )}
        onChange={(e) => setValue({ ...value, orderRequired: e.target.checked })}
      />
    </Container>
  );
};
