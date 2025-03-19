import { BoolcheckLogo, CloseButton, Header } from './header.tsx';
import { Count, Empty } from './footer.tsx';
import { ReportMessageFalse, ReportMessageTrue, ReportToBoolcheck } from './content.tsx';

interface PopupProps {
  closeHandler: () => void;
}

interface PopupWithCountsProps extends PopupProps {
  count:
    | {
        trueCount: number;
        falseCount: number;
        elseCount: number;
      }
    | undefined;
}

export const EmptyPopup = (props: PopupProps) => {
  return (
    <>
      <Header>
        <BoolcheckLogo />
        <CloseButton closeHandler={props.closeHandler} />
      </Header>
      <ReportToBoolcheck />
      <Empty />
    </>
  );
};

export const BoolcheckPopup = ({ count, closeHandler }: PopupWithCountsProps) => {
  if (count === undefined) {
    return <EmptyPopup closeHandler={closeHandler} />;
  }
  const header = (
    <>
      <Header>
        <BoolcheckLogo />
        <CloseButton closeHandler={closeHandler} />
      </Header>
    </>
  );
  const footerCount = <Count {...count} />;

  if (count.falseCount > 0) {
    return (
      <>
        {header}
        <ReportMessageFalse count={count.falseCount} />
        {footerCount}
      </>
    );
  }

  return count.trueCount === 0 ? (
    <EmptyPopup closeHandler={closeHandler} />
  ) : (
    <>
      {header}
      <ReportMessageTrue count={count.trueCount} />
      {footerCount}
    </>
  );
};
