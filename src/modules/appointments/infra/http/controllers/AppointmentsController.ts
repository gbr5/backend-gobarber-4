import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import { classToClass } from 'class-transformer';

export default class AppointmentsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { provider_id, date } = req.body;
    const user_id = req.user.id;

    const createAppointment = container.resolve(CreateAppointmentService);

    const appointment = await createAppointment.execute({
      date,
      provider_id,
      user_id,
    });

    return res.json(classToClass(appointment));
  }
}
