import type { Block } from "blockly";
import { CustomBlock } from "./CustomBlock";
import { NeverRestriction } from "../restrictions/NeverRestriction";
import { TopLevelParentRestriction } from "../restrictions/TopLevelParentRestriction";

class TestBlock extends CustomBlock {
  id = 'com_leondrolio_log'
  restrictions = [
    new NeverRestriction('Do not use this block', []),
    new TopLevelParentRestriction('The XYZ block must be the top level parent', ['XYZ'])
  ]

  defineBlock(this: Block) {
    this.jsonInit({
      type: this.id,
      message0: "console.log('Hello!')",
      colour: 230,
      tooltip: "",
      helpUrl: "",
    });
  }

  toJavaScript(block: Block) {
    return 'console.log("Hello!")';
  }
}

export { TestBlock };
