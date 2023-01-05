import React, { ChangeEvent, useCallback, useMemo, useState } from "react";
import { Thing } from "./Button.style";
import Button from "./Button";
import { ComponentMeta, Story } from "@storybook/react";
import { ButtonProps as IButtonProps, Input } from "@mui/material";

export default {
  title: "Component/Button",
  component: Button,
} as ComponentMeta<typeof Button>;

// 템플릿은 하나의 컴포넌트라고 생각하시고 작성하시면 됩니다. hook 사용 가능합니다.

/**
 * 문제 1. (FirstTemplate 에 작성합니다.)
 * 간단한 버튼 3개를 구현해주세요. 버튼 문서는 오른쪽 링크를 참조합니다. (https://mui.com/material-ui/react-button/)
 * 첫 번째 버튼의 속성은 small 사이즈이며 outlined, primary 입니다.
 * 두 번째 버튼의 속성은 medium 사이즈이며 contained, secondary 입니다.
 * 첫 번째 버튼의 속성은 large 사이즈이며 text, error 입니다.
 */
const FirstTemplate: Story<IButtonProps> = (args) => {
  return (
    <>
      <Button size="small" variant="outlined" color="primary">
        Primary
      </Button>
      <Button size="medium" variant="contained" color="secondary">
        Secondary
      </Button>
      <Button size="large" variant="text" color="error">
        Error
      </Button>
    </>
  );
};

/**
 * 문제 2. (SecondTemplate 에 작성합니다.)
 * InputText 에 값이 없을 때 비활성화, 값이 있을 때 활성화 되는 버튼을 만들어주세요.
 * 주석 처리된 Input 을 이용하면 됩니다.
 * 버튼은 현재 import 되어있는 Button 컴포넌트를 활용하면 됩니다.
 * Template 에 작성되는 코드는 컴포넌트라고 생각해주시고, 최적화를 고려해서 작성해주세요!
 */
const SecondTemplate: Story<IButtonProps> = (args) => {
  const [text, setText] = useState<string | number>("");
  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  }, []);
  return (
    <div>
      <Input value={text} onChange={handleChange} />
      <Button disabled={!text}>Submit</Button>
    </div>
  );
};

/**
 * 문제 3. (ThirdTemplate 에 작성합니다.)
 * interface 에 버튼 세 개를 만들어주세요.
 * interface 의 <div> 에는 emotion/css 를 활용해 margin 을 부여해주세요.
 * className이 Thing 인 <div> 태그는 styled 를 활용해 Thing 이라는 styled-component 를 만들어주세요.
 * Thing 스타일은 다음과 같습니다. width: 60px, height: 60px, border-radius: 25px, background-color: blue
 * 첫 번째 버튼을 클릭하면 Thing 의 스타일이 width:30px, height:30px, background-color: red으로 변경됩니다.
 * 두 번째 버튼을 클릭하면 Thing 의 스타일이 width:90px, height:90px, background-color: green으로 변경됩니다.
 * 세 번째 버튼을 클릭하면 Thing 의 스타일이 원래대로 돌아옵니다.
 */

const ThirdTemplate: Story<IButtonProps> = (args) => {
  const buttons = useMemo(() => {
    return [
      { number: 1, id: "red" },
      { number: 2, id: "green" },
      { number: 3, id: "blue" },
    ];
  }, []);

  const [changeButtonStyle, setChangeButtonStyle] = useState<string>("blue");
  const onButtonStyleChange = useCallback(
    ({ currentTarget }: React.MouseEvent<HTMLButtonElement>) => {
      const { id } = currentTarget;
      setChangeButtonStyle(id);
    },
    []
  );

  return (
    <div>
      <Thing changeButtonStyle={changeButtonStyle} />
      <div className="interface">
        {buttons.map((button) => {
          return (
            <Button
              key={button.id}
              id={button.id}
              onClick={onButtonStyleChange}
            >
              {button.number}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export const First = FirstTemplate.bind({});
export const DisableButton = SecondTemplate.bind({});
export const ThirdButton = ThirdTemplate.bind({});
