import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';

@EventSubscriber()
export class EveryEventSubscriber implements EntitySubscriberInterface<any> {
  beforeInsert(event: InsertEvent<any>) {
    console.log(`BEFORE ENTITY INSERTED: `, event.entity);
  }

  afterInsert(event: InsertEvent<any>) {
    console.log(event);
    // örnegin senaryo olarak her crud işlemlerdeki ekleme silme güncelleme işlemlerinde loglama yapmak istiyoruz ve bunları veritabanına kaydetmek istiyoruz diyelim. burada  user.log.entity tablosuna örnegin kaydetme işlemi olabilir. ben burda örnek olması amacıyla paylaşmak istedim. bizim senaryoda böyle bir şey olmadıgı için yazmadım.. içergini. bu snearyoyu afterUpdate içinde uygulayabilriz. böylelikle decerators'lardan yararlanmış oluruz.
  }

  afterUpdate(event: UpdateEvent<any>) {
    console.log(`AFTER ENTITY UPDATED: `, event.entity);
  }
}
