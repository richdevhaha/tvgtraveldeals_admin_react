import { AnyAction, CombinedState, Reducer } from "redux";

import { TemplateState } from "../redux/template/reducer";
import { AuthState } from "../redux/auth/reducer";
import { CurrencyState } from "../redux/currency/reducer";
import { DashboardState } from "../redux/dashboard/reducer";
import { DestinationState } from "../redux/destination/reducer";
import { HelpState } from "../redux/helpRequest/reducer";
import { QrState, TicketState } from "../redux/ticket/reducer";
import { UiState } from "../redux/ui/reducer";
import { UserState } from "../redux/user/reducer";
import { BookingState } from "../redux/booking/reducer";

type RootReducer = Reducer<
  CombinedState<{
    router: any;
    template: TemplateState;
    auth: AuthState;
    currency: CurrencyState;
    dashboard: DashboardState;
    destination: DestinationState;
    helpRequest: HelpState;
    ticket: TicketState;
    qr:QrState;
    ui: UiState;
    user: UserState;
    booking: BookingState
  }>,
  AnyAction
>;

export type RootState = ReturnType<RootReducer>;
