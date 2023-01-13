import React, { useMemo, useCallback } from "react";
import { ComponentMeta, Story } from "@storybook/react";
import StoryFormRow, { IFormRowProps } from "./FormRow";
import { Wrapper } from "./FormRow.style";
import { useForm } from "react-hook-form";
import Button from "../../Button/Button";
import Radio from "../InputControl/Radio";
import { Div } from "./FormRow.style";
import InputText from "../../Form/InputControl/InputText";
import { Checkbox } from "../../Form/InputControl";
import { migratorRadioStyle } from "../InputControl/Radio/Radio.style";
import { useState } from "@storybook/addons";
import { migratorCheckboxStyle } from "../InputControl/Checkbox/Checkbox.style";
import { Size } from "../../../common/enum";
import { errorStyle } from "../InputControl/InputText/InputText.style";
import Table from "../../Table";
import StoryDefinitionList from "../../DefinitionList/DefinitionList";
import { EJROH_COLUMNS } from "./columns";
import { BrowserRouter } from "react-router-dom";

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

// type은 component 밖에 선언함
export type FormData = {
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

const EJForm: Story<IFormRowProps> = (args) => {
  const { getValues, control, reset, formState, handleSubmit } =
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

  const options = useMemo(
    () => [
      { value: "F", label: "female" },
      { value: "M", label: "male" },
    ],
    []
  );

  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [isPwdChecked, setIsPwdChecked] = useState<boolean>(false);
  const checkHandler = useCallback(
    () => setIsChecked((isChecked) => !isChecked),
    []
  );

  const [formData, setFormData] = useState<FormData>({
    id: "",
    name: "",
    pwd: "",
    pwdConfirm: "",
    gender: "F",
    email: "",
    phone: "",
    address: "",
    description: "",
  });

  const [tableData, setTableData] = useState<FormData[]>([]);

  const pwdValidationCheck = useCallback(() => {
    const pwd = getValues("pwd");
    const confirm = getValues("pwdConfirm");

    if (pwd === "" || confirm === "") {
      alert("비밀번호를 모두 입력해주세요");
    } else if (pwd !== confirm) {
      setIsPwdChecked(false);
      alert("비밀번호가 일치하지 않습니다");
    } else {
      setIsPwdChecked(true);
      alert("비밀번호가 일치합니다");
    }
  }, [getValues]);

  const resetHandler = useCallback(() => {
    reset();
    setIsChecked(false);
  }, [reset]);

  const onSubmit = useCallback(
    (data: FormData) => {
      setFormData(data);
      setTableData([...tableData, data]);
      reset();
      setIsChecked(false);
    },
    [reset, tableData]
  );

  const matchPasswordHandler = useCallback(() => {
    if (!isPwdChecked) {
      return;
    } else {
      setIsPwdChecked(false);
    }
  }, [isPwdChecked]);

  // key value 를 definition list 구조에 맞게 데이터 가공해 할당 하기
  const value = useMemo(() => {
    return Object.entries(formData).map(([key, value]) => {
      if (key === "address") {
        return {
          title: key,
          description: value,
          copyProps: {
            disabled: false,
            value: "my home",
          },
        };
      } else if (key === "pwdConfirm" || key === "pwd") {
        return {
          title: key,
          description: value,
          copyProps: {
            disabled: true,
          },
        };
      }
      return {
        title: key,
        description: value,
      };
    });
  }, [formData]);
  return (
    <>
      <Wrapper onSubmit={handleSubmit(onSubmit)}>
        <StoryFormRow label={"ID"} required>
          <Div>
            <InputText
              inputSize={Size.S}
              control={control}
              name={"id"}
              placeholder={"ID"}
              type="text"
              rules={{ required: true }}
            />
          </Div>
        </StoryFormRow>
        <StoryFormRow label={"Name"} required>
          <Div>
            <InputText
              inputSize={Size.S}
              control={control}
              name={"name"}
              placeholder={"Name"}
              type="text"
              rules={{ required: true }}
            />
          </Div>
        </StoryFormRow>
        <StoryFormRow label={"Password"} required>
          <Div>
            <InputText
              inputSize={Size.S}
              control={control}
              name={"pwd"}
              placeholder={"Password"}
              onChange={matchPasswordHandler}
              type="password"
              rules={{ required: true }}
            />
          </Div>
        </StoryFormRow>
        <StoryFormRow label={"Password confirm"} required>
          <Div>
            <InputText
              inputSize={Size.S}
              control={control}
              name={"pwdConfirm"}
              placeholder={"Password confirm"}
              type="password"
              rules={{
                required: true,
              }}
            />
            &nbsp;
            <Button size={"large"} onClick={pwdValidationCheck}>
              비밀번호 확인
            </Button>
          </Div>
        </StoryFormRow>
        <StoryFormRow label={"Gender"} required>
          <Div>
            <Radio
              control={control}
              options={options}
              name="gender"
              radioStyle={migratorRadioStyle}
              rules={{ required: true }}
            />
          </Div>
        </StoryFormRow>
        <StoryFormRow
          label={"Email"}
          required
          helperMessage={formState.errors.email?.message || ""}
        >
          <Div>
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
                    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/,
                  message: "올바른 이메일 형식이 아닙니다.",
                },
              }}
            />
          </Div>
        </StoryFormRow>
        <StoryFormRow
          label={"Phone"}
          required
          helperMessage={formState.errors.phone?.message}
        >
          <Div>
            <InputText
              inputSize={Size.S}
              control={control}
              name={"phone"}
              placeholder={"Phone"}
              type="tel"
              rules={{
                required: true,
                pattern: {
                  value: /^01([0|1|6|7|8|9])-([0-9]{3,4})-([0-9]{4})$/,
                  message:
                    "01X-123-1234 또는 01X-1234-1234 형식으로 입력해주세요",
                },
              }}
            />
          </Div>
        </StoryFormRow>
        <StoryFormRow label={"Address"} required>
          <Div>
            <InputText
              inputSize={Size.S}
              control={control}
              name={"address"}
              placeholder={"Address"}
              type="text"
              rules={{ required: true }}
            />
          </Div>
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
          <Div>
            {isChecked && (
              <InputText
                fullWidth
                inputSize={Size.S}
                control={control}
                name={"description"}
                placeholder={"Enter description"}
                type="text"
              />
            )}
          </Div>
        </StoryFormRow>
        <div style={{ margin: "5px 0 5px 0" }}>
          <Button onClick={resetHandler}>Reset</Button>
          &nbsp;
          <Button type="submit" disabled={!formState.isValid || !isPwdChecked}>
            Submit
          </Button>
        </div>
      </Wrapper>
      <br />
      {/*
       * 01.11 (화)
       * < 입력한 Form 데이터로 Definition List 출력하기 >
       * 앞서 작성한 Form을 통해 데이터를 저장 후 DefinitionList를 사용해 데이터를 조회할 수 있도록 합니다.
       *
       * 1. 저장된 데이터를 DefinitionList에서 사용할 수 있도록 가공합니다.
       *    ** 선언된 타입(IDefinitionValue)을 이용해 설계합니다.
       *    ** title로는 form에서 사용된 field명이 출력됩니다.
       *    ** description으로 입력한 데이터가 출력됩니다.
       *
       * 2. address 데이터를 클립보드 복사 할 때 입력된 값이 아닌 'my home'이 복사되도록 합니다.
       *    ** copyProps를 활용해 구현합니다.
       *
       * 3. pwd 데이터는 클립보드 복사가 되지 않도록 합니다.
       *    ** copyProps를 활용해 구현합니다.
       */}

      <StoryDefinitionList value={value} />
      <br />
      {/*
       * 01.12 (목)
       * < 입력한 Form 데이터로 Table 출력하기 >
       * 앞서 작성한 Form을 통해 데이터를 저장 후 Table을 사용해 데이터를 조회할 수 있도록 합니다.
       * playce-ui에 정의된 Table을 import 해서 사용합니다.
       *
       * 1. Form에서 입력한 데이터를 통해 Table에서 볼 수 있게 합니다.
       *    ** 기존의 formData가 유지된 상태로 Form에서 새로 입력받은 데이터가 계속 추가될 수 있도록 합니다.
       *    ** form에서 새로 저장할 때마다 formData에 쌓이도록 하며 최소 5개의 데이터를 저장해 Table에서 출력해줍니다.
       *
       * 2. table을 구성하기 위한 column을 정의해줍니다.
       *    ** columns.ts에 정의된 EJROH_COLUMNS에 코드를 작성하고 import 해서 사용하면 됩니다.
       *    ** 기본적으로 id, Header, accessor을 사용하고 필요에 따라 Cell 속성을 정의해 이용합니다.
       *    ** id column은 <BlankLink> 컴포넌트를 이용해 클릭이 가능하게 합니다 (링크 이동 이벤트는 아무렇게나 하셔도 괜찮아요)
       *    ** address column의 minWidth가 60이 되도록 합니다
       *
       * 3. 데이터가 없을 시에 메세지가 출력되도록 합니다.
       *    ** "위의 Form을 이용해 데이터를 입력해주세요" 라고 출력해줍니다
       *
       */}
      <BrowserRouter>
        <Table<FormData>
          columns={EJROH_COLUMNS}
          data={tableData}
          name="ejroh-table"
          idColumn={null}
          usePagination={true}
          noDataComponent={"위의 Form을 이용해 데이터를 입력해주세요"}
        />
      </BrowserRouter>
    </>
  );
};

export const Basic = FormRow.bind({});
export const EJSampleForm = EJForm.bind({});
