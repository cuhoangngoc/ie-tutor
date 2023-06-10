import * as React from 'react';
import axios from 'axios';
import Paper from '@mui/material/Paper';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Spinner from '../components/Spinner';
import { ViewState, EditingState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  WeekView,
  MonthView,
  Appointments,
  AppointmentTooltip,
  AppointmentForm,
  Toolbar,
  TodayButton,
  DateNavigator,
  EditRecurrenceMenu,
  DragDropProvider,
} from '@devexpress/dx-react-scheduler-material-ui';
import { showErrorToast, showSuccessToast } from '../components/Toast';
import { fabClasses } from '@mui/material';

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

function renderDateCell(cellData) {
  return (
    <React.Fragment>
      <div className="name">{dayOfWeekNames[cellData.date.getDay()]}</div>
      <div className="number">{cellData.date.getDate()}</div>
    </React.Fragment>
  );
}

export default class EditableSchedule extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: props.bookings,
      currentViewName: 'Week',
    };

    this.currentViewNameChange = (e) => {
      this.setState({ currentViewName: e.target.value });
    };

    this.commitChanges = this.commitChanges.bind(this);
  }

  commitChanges({ added, changed, deleted }) {
    if (!this.props?.studentId) {
      showErrorToast('Please login to book a schedule');
      return;
    }

    const studentId = this.props.studentId.split('|')[1];
    const instructorId = this.props.instructorId;

    this.setState(async (state) => {
      let { data } = state;
      if (added) {
        // Add new appointment to database
        try {
          const res = await axios.post(`${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/bookings`, {
            studentId,
            instructorId,
            status: 'pending',
            ...added,
          });

          if (res.status !== 200) {
            showErrorToast('This time slot is not available');
            return;
          }

          // // Get the new appointment
          // const newAppointment = res.data;

          // // Add new appointment to state
          // data = [...data, { ...added, id: newAppointment._id }];

          showSuccessToast('Successfully booked. Please wait for confirmation');
        } catch (err) {
          console.log(err);
          showErrorToast('This time slot is not available');
        }
      }
      if (changed) {
        data = data.map((appointment) =>
          changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment
        );
        console.log(changed);

        const [id, updatedData] = Object.entries(changed)[0];

        showSuccessToast('update');

        // Update appointment in database
        // const res = await axios.patch(
        //   `${process.env.NEXT_PUBLIC_BASE_URL}/api/appointments/update`,
        //   {
        //     id,
        //     updatedData,
        //   }
        // );

        // if (res.status !== 200) showErrorToast('Cập nhật lịch họp thất bại');
        // showSuccessToast('Cập nhật lịch họp thành công');
      }
      if (deleted !== undefined) {
        data = data.filter((appointment) => appointment.id !== deleted);
        showSuccessToast('delete');
        // Delete appointment in database
        // const res = await axios.delete(
        //   `${process.env.NEXT_PUBLIC_BASE_URL}/api/appointments/delete`,
        //   {
        //     params: {
        //       id: deleted,
        //     },
        //   }
        // );

        // if (res.status !== 200) showErrorToast('Xóa lịch họp thất bại');
        // showSuccessToast('Xóa lịch họp thành công');
      }
      // reload page
      // window.location.reload();
      return { data };
    });
  }

  componentDidMount() {}

  render() {
    const { data, currentViewName } = this.state;

    return (
      <div>
        <ExternalViewSwitcher
          currentViewName={currentViewName}
          onChange={this.currentViewNameChange}
        />

        <Paper>
          <Scheduler data={data} showAllDayPanel={false}>
            <ViewState currentViewName={currentViewName} />
            <WeekView startDayHour={7} endDayHour={19} dateCellRender={renderDateCell} />
            {/* <WeekView
              name="Work Week"
              excludedDays={[0, 6]}
              startDayHour={7}
              endDayHour={19}
            /> */}
            <MonthView dateCellRender={renderDateCell} />

            <EditingState onCommitChanges={this.commitChanges} />

            <Appointments appointmentComponent={Appointment} />

            <AppointmentTooltip showCloseButton />

            <AppointmentForm disableSaveButton={true} />

            <Toolbar />
            <DateNavigator />
            <TodayButton />
            {/* <DragDropProvider /> */}
          </Scheduler>
        </Paper>
      </div>
    );
  }
}
