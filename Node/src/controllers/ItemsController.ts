import { Request, Response } from 'express';

import knex from '../database/connection';

class ItemsController {
  async index(request: Request, response: Response) {
    const items = await knex('items').select('*');

    const serializedItems = items.map(item => ({
      id: item.id,
      title: item.title,
      image_url: `http://localhost:3333/uploads/${item.image}`,
    }));

    return response.json(serializedItems);
  }

  async show(request: Request, response: Response) {}
  async create(request: Request, response: Response) {}
  async update(request: Request, response: Response) {}
  async delete(request: Request, response: Response) {}
}

export default new ItemsController();
