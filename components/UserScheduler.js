import * as React from 'react';
import Paper from '@mui/material/Paper';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  WeekView,
  MonthView,
  Appointments,
  AppointmentTooltip,
  Toolbar,
  TodayButton,
  DateNavigator,
} from '@devexpress/dx-react-scheduler-material-ui';

const Appointment = ({ children, style, ...restProps }) => (
  <Appointments.Appointment
    {...restProps}
    style={{
      ...style,
      borderRadius: '8px',
      fontSize: '16px',
      fontWeight: '600',
      color: '#fff',
    }}
  >
    {children}
  </Appointments.Appointment>
);

const ExternalViewSwitcher = ({ currentViewName, onChange }) => (
  <RadioGroup
    aria-label="Views"
    style={{ flexDirection: 'row' }}
    name="views"
    value={currentViewName}
    onChange={onChange}
  >
    <FormControlLabel value="Week" control={<Radio />} label="Week" />
    {/* <FormControlLabel value="Work Week" control={<Radio />} label="Work Week" /> */}
    <FormControlLabel value="Month" control={<Radio />} label="Month" />
  </RadioGroup>
);

export default class UserScheduler extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: props.bookings,
      currentViewName: 'Week',
    };

    this.currentViewNameChange = (e) => {
      this.setState({ currentViewName: e.target.value });
    };
  }

  render() {
    const { data, currentViewName } = this.state;

    return (
      <div>
        <ExternalViewSwitcher
          currentViewName={currentViewName}
          onChange={this.currentViewNameChange}
        />

        <Paper>
          <Scheduler data={data}>
            <ViewState currentViewName={currentViewName} />
            <WeekView startDayHour={7} endDayHour={19} />
            {/* <WeekView
              name="Work Week"
              excludedDays={[0, 6]}
              startDayHour={7}
              endDayHour={19}
            /> */}
            <MonthView />

            <Appointments appointmentComponent={Appointment} />
            <AppointmentTooltip showCloseButton />

            <Toolbar />
            <DateNavigator />
            <TodayButton />
          </Scheduler>
        </Paper>
      </div>
    );
  }
}
