/**
 * Rrr type for describing error info.
 */

type Err = {
  readonly message: string, // Message for human. Only letter, number, space, and underscore allowed.
  readonly code:    string  // Code for machine. Only letter, number, and underscore allowed.
};

export type {Err};
