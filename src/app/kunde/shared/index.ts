export {
    type Kunde,
    type GeschlechtTyp,
    type KundeShared,
    EMAIL_REGEX,
} from './kunde';
export {
    KundeReadService,
    type KundenServer,
    type Suchkriterien,
} from './kundeRead.service';
export { KundeWriteService } from './kundeWrite.service';
export { FindError, SaveError, UpdateError, RemoveError } from './errors';
