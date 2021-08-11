// declare module 'blockly' {
//   import type Blockly, { BlocklyOptions, Events, Workspace } from 'blockly';

//   export interface Block {
//     setWarningText(text: string, id?: string): void;
//     setWarningText(text: null): void;
//   }

//   const instance: Blockly;
//   export default instance;
// }

declare module 'blockly/javascript' {
  import type Blockly from 'blockly';
  
  class JavaScript extends Blockly.Generator {
    [key: string]: (block: Blockly.Block) => (string | [string, number])
  }

  const instance: JavaScript
  export = instance;
}

declare module 'blockly/python' {
  import type Blockly from 'blockly';
  
  class Python extends Blockly.Generator {
    [key: string]: (block: Blockly.Block) => (string | [string, number])
  }

  const instance: Python
  export = instance;
}

declare module 'blockly/lua' {
  import type Blockly from 'blockly';
  
  class Lua extends Blockly.Generator {
    [key: string]: (block: Blockly.Block) => (string | [string, number])
  }

  const instance: Lua
  export = instance;
}

declare module 'blockly/dart' {
  import type Blockly from 'blockly';
  
  class Dart extends Blockly.Generator {
    [key: string]: (block: Blockly.Block) => (string | [string, number])
  }

  const instance: Dart
  export = instance;
}

declare module 'blockly/php' {
  import type Blockly from 'blockly';
  
  class Php extends Blockly.Generator {
    [key: string]: (block: Blockly.Block) => (string | [string, number])
  }

  const instance: Php
  export = instance;
}
