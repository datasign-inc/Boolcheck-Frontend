import { ReactNode } from 'react';

export interface HeaderProps {
  children: ReactNode;
}

export interface CloseButtonProps {
  closeHandler: () => void;
}

export const Header = (props: HeaderProps) => {
  return (
    <div
      style={{
        borderBottom: '1px solid #f5f5f5',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center', // 子要素を上下中央に配置
      }}
    >
      {props.children}
    </div>
  );
};

export const BoolcheckLogo = () => {
  return (
    <div
      style={{
        margin: '6px',
      }}
    >
      <img width="50%" src="images/LogoBoolcheck.svg" alt="LogoBoolcheck" />
    </div>
  );
};

export const CloseButton = (props: CloseButtonProps) => {
  return (
    <div
      onClick={props.closeHandler}
      style={{
        color: '#999999',
        margin: '3px',
        marginBottom: '3%',
        marginRight: '7%',
        fontSize: 'large', // ボタンを大きくする
        cursor: 'pointer', // クリックしやすくする
      }}
    >
      ×
    </div>
  );
};
