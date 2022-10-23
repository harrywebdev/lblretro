import ScreenHeader from "~/components/Screen/ScreenHeader"
import ScreenContent from "~/components/Screen/ScreenContent"
import ScreenBottomBar, {
  ScreenBottomBarLink,
} from "~/components/Screen/ScreenBottomBar"
import SecondaryTitle from "~/components/SecondaryTitle"
import Button from "~/components/Button"
import ItemGroup from "~/components/ItemGroup"

export default function SettingsIndexRoute() {
  return (
    <>
      <ScreenHeader largeTitle={<>Settings</>} />

      <ScreenContent>
        <ItemGroup className="p-3 mb-3">
          <SecondaryTitle>Seed Database</SecondaryTitle>
          <form method="post" action="/settings/seed">
            <p className="mb-2">
              This action will create default Areas and Questions.
            </p>
            <Button type={"submit"} label={"Seed"} />
          </form>
        </ItemGroup>

        <ItemGroup className="p-3">
          <SecondaryTitle>Download Database</SecondaryTitle>
          <form method="post" action="/settings/dbdl">
            <p className="mb-2">This action will download current database.</p>
            <Button type={"submit"} label={"Download"} />
          </form>
        </ItemGroup>
      </ScreenContent>

      <ScreenBottomBar activeLink={ScreenBottomBarLink.Settings} />
    </>
  )
}
