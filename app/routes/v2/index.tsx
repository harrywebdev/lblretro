import ScreenHeader from "~/components/Screen/ScreenHeader"
import ScreenContent from "~/components/Screen/ScreenContent"
import ScreenBottomBar, {
  ScreenBottomBarLink,
} from "~/components/Screen/ScreenBottomBar"
import ItemGroup from "~/components/ItemGroup"
import psrDiagram from "~/images/psr_diagram.png"
import AddActivityBoard from "~/components/Activities/AddActivityBoard"

export default function V2IndexRoute() {
  return (
    <>
      <ScreenHeader title="V2" />

      <ScreenContent>
        <ItemGroup className="p-3 mb-3">
          <img src={psrDiagram} alt="PSR diagram" />
        </ItemGroup>

        <AddActivityBoard />
      </ScreenContent>

      <ScreenBottomBar activeLink={ScreenBottomBarLink.V2} />
    </>
  )
}
