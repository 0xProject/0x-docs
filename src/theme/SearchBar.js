import React from "react";
import { MendableSearchBar } from "@mendable/search";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

export default function SearchBarWrapper() {
  const {
    siteConfig: { customFields },
  } = useDocusaurusContext();
  return (
    <div className="mendable-search">
      <MendableSearchBar
        anon_key='a5341b92-5ba9-49cd-b40d-dd8c5ddfa026'
        style={{ accentColor: "#179C54", darkMode: false }}
        placeholder="Search..."
        dialogPlaceholder="How do I implement the Swap API?"
      />
    </div>
  );
}