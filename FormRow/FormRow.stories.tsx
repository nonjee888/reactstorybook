import React, { useMemo, useCallback } from "react";
import { ComponentMeta, Story } from "@storybook/react";
import StoryFormRow, { IFormRowProps } from "./FormRow";
import { Wrapper } from "./FormRow.style";
import { useForm } from "react-hook-form";
import Button from "../../Button/Button";
import Radio from "../InputControl/Radio";
import InputText from "../../Form/InputControl/InputText";
import { Checkbox } from "../../Form/InputControl";
import { migratorRadioStyle } from "../InputControl/Radio/Radio.style";
import { useState } from "@storybook/addons";
import { migratorCheckboxStyle } from "../InputControl/Checkbox/Checkbox.style";
import { Size } from "../../../common/enum";
import { errorStyle } from "../InputControl/InputText/InputText.style";

export default {
  title: "Component/FormRow",
  component: StoryFormRow,
} as ComponentMeta<typeof StoryFormRow>;

const FormRow: Story<IFormRowProps> = (args) => {
  return (
    <StoryFormRow label={"this is sample"} required>
      input
    </StoryFormRow>
  );
};

/**
 * 1월 9일 과제
 * 1. styled 를 활용해 Wrapper 를 만들어주세요. (width: 500px, height: 700px, Wrapper border 속성을 통해서 구분을 주어야합니다.)
 * 2. 사용자로부터 다음의 정보를 입력받을 예정입니다. (id, name, pwd, gender(M, F), email, phone, address, description)
 * ** description 은 선택 입력입니다. 하단에 체크박스를 클릭하면 descipriton 필드가 노출됩니다. 체크박스를 해제하면 안보입니다.
 * ** phone, email 은 각각의 형식에 맞게 입력을 받아야합니다.
 * ** 나머지 필드는 반드시 입력해야 합니다.
 * 3. 비밀번호는 확인을 통해서 입력한 비밀번호가 일치하는지 체크를 해야합니다.
 * 4. 하단에 두개의 버튼이 있습니다. 좌측 버튼을 클릭 시 입력된 내용이 reset 됩니다. 우측 버튼을 클릭 시 입력된 정보를 submit 합니다.
 * 5. submit 버튼을 누르면 console 에서 입력된 정보를 확인할 수 있습니다.
 * 6. submit 버튼은 모든 validation 을 통과해야지 활성화가 됩니다.
 *
 * ** 각각의 입력 필드들은 FormRow 컴포넌트를 통해서 래핑해주세요.
 */

const EJForm: Story<IFormRowProps> = (args) => {
  type FormData = {
    id: string;
    name: string;
    pwd: string;
    pwdConfirm: string;
    gender: string;
    email: string;
    phone: string;
    address: string;
    description: string | null;
  };

  const options = useMemo(
    () => [
      { value: "F", label: "female" },
      { value: "M", label: "male" },
    ],
    []
  );

  const { getValues, setValue, control, reset, formState, handleSubmit } =
    useForm<FormData>({
      mode: "onChange",
      defaultValues: {
        id: "",
        name: "",
        pwd: "",
        pwdConfirm: "",
        gender: "F",
        email: "",
        phone: "",
        address: "",
        description: "",
      },
    });
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const checkHandler = useCallback(() => setIsChecked(!isChecked), [isChecked]);

  const pwdValidationCheck = useCallback(() => {
    if (
      getValues("pwd") !== "" &&
      getValues("pwdConfirm") !== "" &&
      getValues("pwd") !== getValues("pwdConfirm")
    ) {
      alert("비밀번호가 일치하지 않습니다");
    } else if (getValues("pwd") === "" || getValues("pwdConfirm") === "") {
      alert("비밀번호를 모두 입력해주세요");
    } else {
      alert("비밀번호가 일치합니다");
    }
  }, [getValues]);

  const resetHandler = useCallback(() => {
    reset();
    setIsChecked(false);
  }, []);
  const onSubmit = useCallback((data: FormData) => {
    console.log(getValues());
    reset();
    setIsChecked(false);
  }, []);

  return (
    <Wrapper onSubmit={handleSubmit(onSubmit)}>
      <StoryFormRow label={"ID"} required>
        <div style={{ margin: "5px 0 5px 0" }}>
          <InputText
            inputSize={Size.S}
            control={control}
            name={"id"}
            placeholder={"ID"}
            type="text"
            rules={{ required: true }}
          />
        </div>
      </StoryFormRow>
      <StoryFormRow label={"Name"} required>
        <div style={{ margin: "5px 0 5px 0" }}>
          <InputText
            inputSize={Size.S}
            control={control}
            name={"name"}
            placeholder={"Name"}
            type="text"
            rules={{ required: true }}
          />
        </div>
      </StoryFormRow>
      <StoryFormRow label={"Password"} required>
        <div style={{ margin: "5px 0 5px 0" }}>
          <InputText
            inputSize={Size.S}
            control={control}
            name={"pwd"}
            placeholder={"Password"}
            type="password"
            rules={{ required: true }}
          />
        </div>
      </StoryFormRow>
      <StoryFormRow label={"Password confirm"} required>
        <div style={{ margin: "5px 0 5px 0" }}>
          <InputText
            inputSize={Size.S}
            control={control}
            name={"pwdConfirm"}
            placeholder={"Password confirm"}
            type="password"
            rules={{
              required: true,
            }}
          />{" "}
          &nbsp;
          <Button size={"large"} onClick={pwdValidationCheck}>
            비밀번호 확인
          </Button>
        </div>
      </StoryFormRow>
      <StoryFormRow label={"Gender"} required>
        <div style={{ margin: "5px 0 5px 0" }}>
          <Radio
            control={control}
            options={options}
            name="gender"
            radioStyle={migratorRadioStyle}
            rules={{ required: true }}
          />
        </div>
      </StoryFormRow>
      <StoryFormRow
        label={"Email"}
        required
        helperMessage={formState.errors.email?.message || ""}
      >
        <div style={{ margin: "5px 0 5px 0" }}>
          <InputText
            inputSize={Size.S}
            control={control}
            sx={errorStyle}
            name={"email"}
            placeholder={"Email"}
            type="email"
            rules={{
              required: true,
              pattern: {
                value:
                  /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/,
                message: "올바른 이메일 형식이 아닙니다.",
              },
            }}
          />
        </div>
      </StoryFormRow>
      <StoryFormRow
        label={"Phone"}
        required
        helperMessage={formState.errors.phone?.message}
      >
        <div style={{ margin: "5px 0 5px 0" }}>
          <InputText
            inputSize={Size.S}
            control={control}
            name={"phone"}
            placeholder={"Phone"}
            type="tel"
            rules={{
              required: true,
              pattern: {
                value: /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/,
                message:
                  "01X-123-1234 또는 01X-1234-1234 형식으로 입력해주세요",
              },
            }}
          />
        </div>
      </StoryFormRow>
      <StoryFormRow label={"Address"} required>
        <div style={{ margin: "5px 0 5px 0" }}>
          <InputText
            inputSize={Size.S}
            control={control}
            name={"address"}
            placeholder={"Address"}
            type="text"
            rules={{ required: true }}
          />
        </div>
      </StoryFormRow>
      <StoryFormRow label={"Description"}>
        &nbsp; &nbsp;
        <Checkbox
          onClick={checkHandler}
          name="description"
          checked={isChecked}
          disabled={false}
          labelProps={{
            sx: migratorCheckboxStyle,
          }}
        />
        <div style={{ margin: "5px 0 5px 0" }}>
          {isChecked ? (
            <InputText
              fullWidth
              inputSize={Size.S}
              control={control}
              name={"description"}
              placeholder={"Enter description"}
              type="text"
            />
          ) : (
            false
          )}
        </div>
      </StoryFormRow>
      <div style={{ margin: "5px 0 5px 0" }}>
        <Button onClick={resetHandler}>Reset</Button>
        &nbsp;
        <Button type="submit" disabled={!formState.isValid}>
          Submit
        </Button>
      </div>
    </Wrapper>
  );
};

export const Basic = FormRow.bind({});
export const EJSampleForm = EJForm.bind({});
