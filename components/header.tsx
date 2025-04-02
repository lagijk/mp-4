// Navigation that shows the Champion Finder header for the website
"use client";
import Link from "next/link";
import { AppBar, Toolbar, Button, Typography } from "@mui/material";

export default function Header() {
    return (
        <AppBar position="static">
            <Toolbar sx={{ justifyContent: "space-between" }}>
                <Typography variant="h4">
                    Champion Finder
                </Typography>
                <nav>
                    <Button color="inherit" component={Link} href="/about">
                        Home
                    </Button>
                
                    <Button color="inherit" component={Link} href="/rotation">
                        Weekly Rotation
                    </Button>
                </nav>
            </Toolbar>
        </AppBar>
    );
}