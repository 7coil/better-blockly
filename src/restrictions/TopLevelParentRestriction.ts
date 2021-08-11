import { Block } from "blockly";
import { BaseRestriction } from "./BaseRestriction";

/**
 * A restriction which checks if the top level parent is a specified block.
 */
class TopLevelParentRestriction extends BaseRestriction {
  validate(block: Block, allBlocks: Block[]) {
    const topLevelParent = this.getTopLevelParent(block);

    if (topLevelParent) {
      return this.types.includes(topLevelParent.type);
    } else {
      return true
    }
  }

  getTopLevelParent(block: Block): Block | null {
    if (!block) return null;
    if (!block.getParent()) return block;
    return this.getTopLevelParent(block.getParent())
  }
}

export { TopLevelParentRestriction };
