import { BodyText } from "@/components/atoms/BodyText/BodyText";
import { Button } from "@/components/atoms/Button/Button";
import { Input } from "@/components/atoms/Input/Input";
import { Cross } from "@/components/Icons/Cross";

import { useCaisyField } from "@caisy/ui-extension-react";
import { Box, Title, Switch } from "@mantine/core";
import { useForm } from "@mantine/form";
import { randomId } from "@mantine/hooks";
import { type FunctionComponent, useState } from "react";

import {
  CardItem,
  CardItemWrapper,
  Container,
  GameWrapper,
  OptionWrapper,
  OutputWrapper,
  switchStyle,
} from "./SelectionGame.styles";
import { Check } from "../../Icons/Check";

export interface TValue 
{
  options: Array<{ correctAnswer: boolean; id: string; label: string }>;
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

export const SelectionGameWrapper: FunctionComponent = () => 
{
  const [checked, setChecked] = useState(false);

  const { loaded, setValue, value }: ICaisy = useCaisyField();

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

  return !loaded ? (
    <BodyText component="p" styleType="body-01-bold">
      Loading...
    </BodyText>
  ) : !value ? (
    <Button<"button">
      styleType="tertiary"
      onClick={() => setValue({ options: [] })}
      w="25%">
      Reload
    </Button>
  ) : (
    <Container>
      <Title order={3}>Add Options for Card Selection Game</Title>
      <Button<"button">
        styleType="primary"
        onClick={() => setValue({ options: [] })}
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
              <Button<"button">
                styleType="primary"
                type="submit"
                disabled={form.getInputProps("option")?.value?.length <= 1}
                fullWidth
                w="50%">
                Add
              </Button>
            </Box>
          </Box>
          <OutputWrapper>
            {value &&
              value.options &&
              value.options.length > 0 &&
              value.options.map((option) => (
                <CardItemWrapper key={option.id}>
                  <CardItem>
                    <BodyText
                      component="p"
                      styleType="body-01-bold"
                      c={option?.correctAnswer ? "support-success.3" : "support-error.3"}>
                      {option.label}
                    </BodyText>
                  </CardItem>
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
          </OutputWrapper>
        </OptionWrapper>
      </GameWrapper>
    </Container>
  );
};
