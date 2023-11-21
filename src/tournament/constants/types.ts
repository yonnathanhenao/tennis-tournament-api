import { HydratedDocument } from 'mongoose';

import { Tournament } from '../schemas/tournament.schema';

export type TournamentDocument = HydratedDocument<Tournament>;
