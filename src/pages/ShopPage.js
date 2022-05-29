import { ShopModule } from "../components/shop/ShopModule";
import { AuthorisedPage } from "../pages/AuthorisedPage"; 

export const ShopPage = () => {
  return (
    <AuthorisedPage>
      <div>
        <ShopModule />
      </div>
    </AuthorisedPage>
  );
};