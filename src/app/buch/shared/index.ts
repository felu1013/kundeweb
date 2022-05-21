export {
    type FahrradArt,
    type Fahrrad,
    type FahrradShared,
    type Marke,
    MAX_GEWICHT,
} from './fahrrad';
export {
    KundeReadService,
    type KundenServer,
    type Suchkriterien,
} from './fahrradRead.service';
export { KundeWriteService } from './kundeWrite.service';
export { FindError, SaveError, UpdateError, RemoveError } from './errors';
