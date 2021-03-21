
import {
    Body,
    Controller,
    Path,
    Post,
    Route
  } from "tsoa";
  import { PurchaseOrder } from "./purchaseOrder";
  import { POService, POCreationParams } from "./poService";
  

  interface ErrorReport {
    error: String;
  };

  @Route("/purchase")
  export class PurchaseController extends Controller {


    @Post("/get/{uuid}")
    public async getPurchase(@Path() uuid: string
    ): Promise<PurchaseOrder | ErrorReport> {  
      const po : PurchaseOrder = await new POService().getOne(uuid);
      if (po) {
        return po;
      } else {
        return { error: "Not found"};
      }
    }

    @Post("/getall")
    public async getAllPurchases() {
      const pos : PurchaseOrder[] = await new POService().getAll();
      return  pos;
    }
    
  
    @Post("/create")
    public async createPurchase(
      @Body() requestBody: POCreationParams
    ): Promise<PurchaseOrder | ErrorReport> {
      try {
        const po = await (new POService()).create(requestBody);
        return po;
      }
      catch (error) {
        return { error: "bad JSON"};
      }
    }

    @Post("/delete/{uuid}")
    public async delete(@Path() uuid: string) : Promise<any> {  
      try {
        const success:boolean = await new POService().delete(uuid);
        return {"deleted": success};
      }
      catch (error) {
        return {error: "not found"};
      }
    }



    @Post("/update/{uuid}")
    public async updatePO(
        @Path() uuid: string,
        @Body() requestBody: POCreationParams
    ): Promise<PurchaseOrder | ErrorReport> {  
      try {
        const po : PurchaseOrder = await new POService().update(uuid, requestBody);
        if (po) {
          return po;
        }
        else {
          return {error: "uuid not found"};
        }
      }
      catch (error) {
        return { error: "Bad data"};
      }
      
    }

  }