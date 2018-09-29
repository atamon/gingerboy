import * as React from 'react';
import './App.css';

interface IAppState {
  inputs: Array<{ char: string, isCorrect: boolean }>
  allIsCorrect: boolean
}

interface IPartInputProps {
  onUpdate: (value: string) => void
  value: string
  label: string
  isCorrect: boolean
}

const LABEL  = 'GINGERBOY';
// const SECRET = 'GINGERBOY';
const SECRET = 'BBLBWC4VF';

// https://www.youtube.com/watch?v=YgFwM89OCfA

const PartInput = ({ label, onUpdate, value, isCorrect }: IPartInputProps) => {

  const className = `part-input ${isCorrect ? 'part-input__correct' : ''}`;

  return (
    <div className={className}>
      <label htmlFor="input">{label}</label>
      <input disabled={isCorrect} type="text" onChange={e => onUpdate(e.target.value)} value={value}/>
    </div>
  );
}

const Prize = () => {
  return (
    <div className="prize">
      <iframe
        width="100%"
        height="220px"
        src="https://www.youtube.com/embed/_ddQqzwH__4"
        frameBorder="0"
        allow="autoplay; encrypted-media"
        allowFullScreen />
      <h3>🍾🍾🍾 Starta PS4at 🍾🍾🍾</h3>
    </div>
  );
}

class App extends React.Component {

  state: IAppState;

  constructor(props: any) {
    super(props);
    this.state = {
      inputs: [],
      allIsCorrect: false
    };
  }

  updateInput(idx: number, value: string) {
    const inputs = Array.from(this.state.inputs);
    if (idx < 0 || idx >= SECRET.length) throw new Error('Invalid index ' + idx);


    const char = (value[value.length - 1] || '').toUpperCase();
    const isCorrect = char === SECRET[idx];
    inputs[idx] = { char, isCorrect };
    const allIsCorrect = this.state.allIsCorrect || inputs.map(inp => inp.char).join('') === SECRET;
    this.setState({ inputs, allIsCorrect });
  }

  public render() {

    const inputEls = [];
    for (let i = 0; i < SECRET.length; i++) {

      const { isCorrect = false , char = '' } = (this.state.inputs[i] || {});

      inputEls.push(
        <PartInput
          key={i}
          label={LABEL[i]}
          isCorrect={isCorrect}
          value={char}
          onUpdate={value => this.updateInput(i, value)} />
      )
    }

    const className = `App ${this.state.allIsCorrect ? 'all-correct' : ''}`;

    const prize = !this.state.allIsCorrect ? null : <Prize />;

    return (
      <div className={className}>
        {!prize && <h1>Hallonbåtsjakten</h1>}
        {prize}
        <div className="inputs">
          {inputEls}
        </div>
      </div>
    );
  }
}

export default App;
