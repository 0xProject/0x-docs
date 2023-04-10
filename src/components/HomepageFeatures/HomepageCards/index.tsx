import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
// import styles from "./styles.module.css";

type CardItem = {
  title: string;
  link: string;
  description: JSX.Element;
  buttonName: string;
  buttonType:
    | "primary"
    | "secondary"
    | "success"
    | "info"
    | "warning"
    | "danger"
    | "link";
};

const CardList: CardItem[] = [
  {
    title: "Swap API Quick Start ",
    link: "/0x-swap-api/swap-tokens-with-0x-swap-api",
    description: (
      <>
       Get started building crypto trading into your app. Learn how to access the most efficient liquidity for ERC20 tokens through the Swap API!
      </>
    ),
    buttonName: "Build",
    buttonType: "primary",
  },
  {
    title: "Tx Relay API",
    link: "/developers/quickstart",
    description: (
      <>
        Deploy and verify your first smart contract on Linea using your favorite
        developer tools!
      </>
    ),
    buttonName: "Build",
    buttonType: "success",
  },
  {
    title: "Linea Block Explorer",
    link: "https://explorer.goerli.linea.build/",
    description: (
      <>
        View Linea transactions and find deployed contracts and wallet addresses
        on BlockScout!
      </>
    ),
    buttonName: "Explore",
    buttonType: "info",
  },
];

function Card({ title, link, description, buttonName, buttonType }: CardItem) {
  return (
    <div className={clsx("col", "col--4", "margin-top--md")}>
      <div className="card-demo">
        <div className="card">
          <div className="card__header">
            <h3>{title}</h3>
          </div>
          <div className="card__body">
            <p>{description}</p>
          </div>
          <div className="card__footer">
            <Link
              className={clsx(
                "button",
                "button--" + buttonType,
                "button--block",
              )}
              to={link}>
              {buttonName}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HomepageCards(): JSX.Element {
  return (
    <section className={clsx("margin-top--lg", "margin-bottom--lg")}>
      <div className="container">
        <h1>Quick Links</h1>
        <hr />
        <div className="row">
          {CardList.map((props, idx) => (
            <Card key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}