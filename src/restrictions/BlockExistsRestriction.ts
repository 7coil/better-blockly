import { Block } from "blockly";
import { BaseRestriction } from "./BaseRestriction";

/**
 * A restriction which checks if a specified block is found within the workspace, and is also enabled.
 */
class BlockExistsRestriction extends BaseRestriction {
  validate(block: Block, allBlocks: Block[]) {
    return allBlocks.some(b => this.types.includes(b.type) && b.isEnabled())
  }
}

export { BlockExistsRestriction };
