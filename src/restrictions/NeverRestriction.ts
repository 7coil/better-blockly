import { BaseRestriction } from "./BaseRestriction";

/**
 * A restriction which ALWAYS fails.
 */
class NeverRestriction extends BaseRestriction {
  validate() {
    return false;
  }
}

export { NeverRestriction };
