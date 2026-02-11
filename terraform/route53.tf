# Route 53 Hosted Zone
resource "aws_route53_zone" "main" {
  name = var.domain_name

  tags = {
    Name        = "${var.project_name}-${var.environment}"
    Environment = var.environment
    ManagedBy   = "Terraform"
  }
}

# A Record for root domain (schoolwar.kr) - Alias to CloudFront
resource "aws_route53_record" "root" {
  zone_id = aws_route53_zone.main.zone_id
  name    = var.domain_name
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.website.domain_name
    zone_id                = aws_cloudfront_distribution.website.hosted_zone_id
    evaluate_target_health = false
  }
}

# A Record for www subdomain - Alias to CloudFront
resource "aws_route53_record" "www" {
  zone_id = aws_route53_zone.main.zone_id
  name    = "www.${var.domain_name}"
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.website.domain_name
    zone_id                = aws_cloudfront_distribution.website.hosted_zone_id
    evaluate_target_health = false
  }
}
