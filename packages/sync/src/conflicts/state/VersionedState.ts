import { ConflictResolutionData } from "../strategies/ConflictResolutionData";
import { ObjectState } from "./ObjectState";

/**
 * Object state manager using a version field
 * Allows moving to next state using the version field of the object
 *
 * VersionedObjectState requires GraphQL types to contain version field.
 * For example:
 *
 * type User {
 *   id: ID!
 *   version: String
 * }
 */
export class VersionedState implements ObjectState {

  public assignServerState(client: any, server: any): void {
    client.version = server.version;
  }
  public hasConflict(client: any, server: any): boolean {
    return client.version !== server.version;
  }
  public getStateFields(): string[] {
    return  ["version", "id"];
  }

  // FIXME - remove those methods after migration
  public nextState(currentObjectState: ConflictResolutionData) {
    if (currentObjectState.version) {
      currentObjectState.version = currentObjectState.version + 1;
      return currentObjectState;
    }
    return null;
  }

  public currentState(currentObjectState: ConflictResolutionData) {
    return currentObjectState.version;
  }
}