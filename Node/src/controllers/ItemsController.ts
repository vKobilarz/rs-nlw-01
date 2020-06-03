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

  async show(request: Request, response: Response) {
    const { id } = request.params;
    const item = await knex('items').where('id', id).first();

    if (!item) {
      return response
        .status(400)
        .json({ error: `Item with ID ${id} not found` });
    }

    const serializedItem = {
      id,
      title: item.title,
      image_url: `http://localhost:3333/uploads/${item.image}`,
    };

    return response.json(serializedItem);
  }

  async create(request: Request, response: Response) {
    const { title } = request.body;

    const item = {
      title,
      image:
        'https://images.unsplash.com/photo-1554486855-60050042cd53?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60',
    };

    const [id] = await knex('items').insert(item);

    return response.json({
      id,
      ...item,
    });
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const { title } = request.body;

    const trx = await knex.transaction();

    const item = await trx('items').where('id', id).first();

    if (!item) {
      return response
        .status(400)
        .json({ error: `Item with ID ${id} not found` });
    }

    await trx('items').update({ title }).where('id', id);

    await trx.commit();

    return response.json({ ...item, id, title });
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    const trx = await knex.transaction();

    const item = await trx('items').where('id', id).first();

    if (!item) {
      return response
        .status(400)
        .json({ error: `Item with ID ${id} not found` });
    }

    await trx('items').delete().where('id', id);

    await trx.commit();

    return response.json({ ...item, id });
  }
}

export default new ItemsController();
