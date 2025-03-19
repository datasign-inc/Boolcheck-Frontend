interface CountProps {
  trueCount: number;
  falseCount: number;
  elseCount: number;
}

export const Count = (props: CountProps) => {
  return (
    <div style={{ margin: '3%', display: 'flex', justifyContent: 'space-between' }}>
      <div>
        <span style={{ color: '#259D63', fontWeight: 'bold' }}>真</span>: {props.trueCount}
      </div>
      <div>
        <span style={{ color: '#EC0000', fontWeight: 'bold' }}>偽</span>: {props.falseCount}
      </div>
      <div>
        <span style={{ color: '#626264' }}>どちらでもない</span>: {props.elseCount}
      </div>
    </div>
  );
};

export const Empty = () => {
  return (
    <div style={{ margin: '3%', marginTop: '8%', display: 'flex', justifyContent: 'center' }}>
      <span style={{ color: '#626264' }}>真偽情報がありません</span>
    </div>
  );
};
