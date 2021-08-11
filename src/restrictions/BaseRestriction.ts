import type { Block } from "blockly";

abstract class BaseRestriction {
  /**
   * The error message associated with the restriction.
   */
  message: string;

  /**
   * Valid blocks for a specific restriction
   */
  types: string[];

  /**
   * Whether the restriction should act the opposite way.
   */
  inverse: boolean;
  
  constructor(message: string, types: string[] = [], inverse: boolean = false) {
    this.message = message;
    this.types = types;
    this.inverse = inverse;
  }

  /**
   * Check if this restriction fails or not, following the inverse flag.
   * Uses {@see BaseRestriction.validate} to determine the result of this method.
   * @param block The block to test on
   * @param allBlocks All blocks in the workspace
   * @returns Whether the block has passed (true) or has failed (false)
   */
  check(block: Block, allBlocks: Block[]): boolean {
    if (this.inverse) return !this.validate(block, allBlocks);
    return this.validate(block, allBlocks);
  }

  /**
   * Check if this restriction fails or not, WITHOUT following the inverse flag.
   * @param block The block to test on
   * @param allBlocks All blocks in the workspace
   * @returns Whether the block has passed (true) or has failed (false)
   */
  validate(block: Block, allBlocks: Block[]): boolean {
    return false;
  }
}

export {
  BaseRestriction
}
